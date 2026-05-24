export const LEAD_STATUSES = ["new", "contacted", "qualified", "rejected", "hired"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const INDUSTRIES = [
  "Manufacturing",
  "Solar & Renewables",
  "Real Estate",
  "Finance & Accounts",
  "Operations",
  "Sales",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const API_ROUTES = {
  leads: "/api/leads",
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
  },
} as const;
