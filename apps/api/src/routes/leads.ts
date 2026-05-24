import { Router, type Request, type Response, type NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { Lead } from "@ekvir/db/models";
import { requireAuth, type AuthRequest } from "../middleware/auth";

export const leadRouter = Router();

const createLeadValidators = [
  body("name").trim().notEmpty().isLength({ max: 100 }),
  body("email").trim().isEmail().normalizeEmail(),
  body("phone").trim().notEmpty().isLength({ max: 20 }),
  body("company").optional().trim().isLength({ max: 100 }),
  body("industry").optional().trim(),
  body("message").optional().trim().isLength({ max: 1000 }),
];

leadRouter.post("/", createLeadValidators, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ success: false, errors: errors.array() });
      return;
    }

    const { name, email, phone, company, industry, message } = req.body as {
      name: string;
      email: string;
      phone: string;
      company?: string;
      industry?: string;
      message?: string;
    };

    const lead = await Lead.create({ name, email, phone, company, industry, message });
    res.status(201).json({ success: true, data: { id: lead._id } });
  } catch (err) {
    next(err);
  }
});

leadRouter.get(
  "/",
  requireAuth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const page = Math.max(1, Number(req.query["page"] ?? 1));
      const limit = Math.min(100, Math.max(1, Number(req.query["limit"] ?? 20)));
      const status = req.query["status"] as string | undefined;

      const filter = status ? { status } : {};
      const [leads, total] = await Promise.all([
        Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
        Lead.countDocuments(filter),
      ]);

      res.json({ success: true, data: { leads, total, page, limit } });
    } catch (err) {
      next(err);
    }
  }
);

leadRouter.patch(
  "/:id/status",
  requireAuth,
  body("status").isIn(["new", "contacted", "qualified", "rejected", "hired"]),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ success: false, errors: errors.array() });
        return;
      }

      const lead = await Lead.findByIdAndUpdate(
        req.params["id"],
        { status: req.body.status },
        { new: true, runValidators: true }
      ).lean();

      if (!lead) {
        res.status(404).json({ success: false, message: "Lead not found" });
        return;
      }

      res.json({ success: true, data: lead });
    } catch (err) {
      next(err);
    }
  }
);
