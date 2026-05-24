"use client";

import React, { useState } from "react";
import { Input } from "@ekvir/ui";
import { Textarea } from "@ekvir/ui";
import { Button } from "@ekvir/ui";
import { INDUSTRIES } from "@ekvir/config/constants";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  return errors;
}

const INITIAL: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  message: "",
};

export function LeadForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:5000";

  function handleChange(field: keyof FormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((errs) => ({ ...errs, [field]: undefined }));
      }
    };
  }

  function toggleIndustry(industry: string) {
    setValues((v) => ({
      ...v,
      industry: v.industry === industry ? "" : industry,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setFormState("success");
      setValues(INITIAL);
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-2xl border border-[#C2A96A]/30 bg-[#C2A96A]/5 p-8 text-center">
        <p className="font-heading text-2xl font-light text-[#2B2B2B] mb-2">
          Thank you.
        </p>
        <p className="font-body text-sm text-[#8A8375]">
          We will be in touch within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setFormState("idle")}
          className="mt-6 font-body text-sm text-[#C2A96A] underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Aditya Shah"
          value={values.name}
          onChange={handleChange("name")}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+91 99040 44439"
          value={values.phone}
          onChange={handleChange("phone")}
          error={errors.phone}
          autoComplete="tel"
          required
        />
        <Input
          label="Company (optional)"
          placeholder="Your company name"
          value={values.company}
          onChange={handleChange("company")}
          autoComplete="organization"
        />
      </div>

      {/* Industry pill selector */}
      <fieldset>
        <legend className="font-body text-sm font-medium text-[#2B2B2B] mb-3">
          Industry (optional)
        </legend>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => {
            const active = values.industry === industry;
            return (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                aria-pressed={active}
                className={[
                  "rounded-full border px-4 py-2 font-body text-xs transition-colors duration-150",
                  active
                    ? "border-[#C2A96A] bg-[#C2A96A] text-white"
                    : "border-[#C2A96A]/30 text-[#8A8375] hover:border-[#C2A96A] hover:text-[#C2A96A]",
                ].join(" ")}
              >
                {industry}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Textarea
        label="Message (optional)"
        placeholder="Briefly describe your hiring requirement…"
        value={values.message}
        onChange={handleChange("message")}
      />

      {formState === "error" && (
        <p role="alert" className="font-body text-sm text-red-500">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button
        type="submit"
        loading={formState === "submitting"}
        size="lg"
        className="self-start"
      >
        Send Enquiry
      </Button>
    </form>
  );
}
