import { Router, type Request, type Response, type NextFunction } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { User } from "@ekvir/db/models";

export const authRouter = Router();

const googleClient = new OAuth2Client(process.env["GOOGLE_CLIENT_ID"]);

function signToken(userId: string, role: string, name?: string): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret) throw new Error("JWT_SECRET not set");
  return jwt.sign({ userId, role, name }, secret, { expiresIn: "7d" });
}

// ── POST /api/auth/login ──────────────────────────────────────────────────────
authRouter.post(
  "/login",
  [
    body("email").trim().isEmail().normalizeEmail(),
    body("password").notEmpty().isLength({ min: 8 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ success: false, errors: errors.array() });
        return;
      }

      const { email, password } = req.body as { email: string; password: string };

      const user = await User.findOne({ email });
      if (!user || !user.passwordHash) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return;
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return;
      }

      const token = signToken(String(user._id), user.role, user.name);
      res.json({ success: true, data: { token, role: user.role } });
    } catch (err) {
      next(err);
    }
  }
);

// ── POST /api/auth/signup ─────────────────────────────────────────────────────
authRouter.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Full name is required").isLength({ max: 100 }),
    body("phone").trim().notEmpty().withMessage("Contact number is required").isLength({ max: 20 }),
    body("email").trim().isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ success: false, errors: errors.array() });
        return;
      }

      const { name, phone, email, password } = req.body as {
        name: string;
        phone: string;
        email: string;
        password: string;
      };

      const existing = await User.findOne({ email });
      if (existing) {
        res.status(409).json({ success: false, message: "An account with this email already exists" });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        phone,
        email,
        passwordHash,
        role: "user",
        provider: "email",
      });

      const token = signToken(String(user._id), user.role, name);
      res.status(201).json({ success: true, data: { token, role: user.role } });
    } catch (err) {
      next(err);
    }
  }
);

// ── POST /api/auth/google ─────────────────────────────────────────────────────
// Receives a Google ID token from the frontend, verifies it, and upserts the user.
authRouter.post(
  "/google",
  body("idToken").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ success: false, errors: errors.array() });
        return;
      }

      const { idToken } = req.body as { idToken: string };
      const clientId = process.env["GOOGLE_CLIENT_ID"];

      if (!clientId) {
        res.status(500).json({ success: false, message: "Google SSO is not configured" });
        return;
      }

      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: clientId,
      });

      const payload = ticket.getPayload();
      if (!payload?.email) {
        res.status(401).json({ success: false, message: "Invalid Google token" });
        return;
      }

      const { sub: googleId, email, name } = payload;

      // Find by googleId first, then fall back to email (handles migration)
      let user = await User.findOne({ $or: [{ googleId }, { email }] });

      if (user) {
        // Update googleId if missing (first Google login on an existing email account)
        if (!user.googleId) {
          user.googleId = googleId;
          user.provider = "google";
          await user.save();
        }
      } else {
        user = await User.create({
          name,
          email,
          googleId,
          role: "user",
          provider: "google",
        });
      }

      const token = signToken(String(user._id), user.role, user.name);
      res.json({ success: true, data: { token, role: user.role } });
    } catch (err) {
      next(err);
    }
  }
);
