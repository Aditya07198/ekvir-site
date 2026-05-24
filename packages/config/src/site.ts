export const site = {
  brand: {
    name: "EKVIR",
    tagline: "Precision Talent. Real Results.",
    colors: {
      background: "#F7F5EF",
      primaryText: "#2B2B2B",
      accent: "#C2A96A",
      secondaryText: "#8A8375",
      dark: "#111111",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Manrope",
    },
  },
  contact: {
    phone: "9904044439",
    whatsapp: "9904044439",
    location: "Karelibaug, Vadodara, Gujarat",
    email: "contact@ekvir.in",
  },
  seo: {
    primaryKeywords: [
      "recruitment agency Vadodara",
      "staffing solutions Gujarat",
      "contract staffing India",
      "hiring services India",
    ],
  },
  services: [
    {
      name: "Permanent Staffing",
      slug: "permanent-staffing",
      description: "End-to-end hiring support for long-term workforce requirements.",
      longDescription:
        "We handle the entire permanent recruitment cycle — from role scoping and sourcing to screening, interviewing coordination, and offer closure. Our talent network spans Gujarat and pan-India, ensuring you get the right hire, not just the fastest one.",
      features: [
        "Dedicated recruiter per mandate",
        "Sourcing from active + passive candidate pools",
        "Structured interview coordination",
        "Reference and background verification",
        "Post-placement follow-up for 90 days",
      ],
    },
    {
      name: "Contract Staffing",
      slug: "contract-staffing",
      description: "Flexible workforce solutions with payroll and compliance support.",
      longDescription:
        "Scale your workforce up or down without the overhead of permanent headcount. We deploy pre-screened contract talent on our payroll, managing all statutory compliance, PF, ESIC, and payslip generation — you focus on the work, we handle the paperwork.",
      features: [
        "Short-term and long-term contracts",
        "Payroll and statutory compliance on us",
        "PF, ESIC, and tax deduction management",
        "Rapid mobilisation within days",
        "Replacement guarantee for no-shows",
      ],
    },
    {
      name: "Executive Search",
      slug: "executive-search",
      description: "Confidential search for leadership, CXO, and senior management roles.",
      longDescription:
        "Senior hires are high-stakes decisions. Our executive search practice combines deep market mapping, direct outreach to passive leaders, and a rigorous competency assessment process to surface candidates who fit your culture as much as your job description.",
      features: [
        "Confidential search for sensitive mandates",
        "Market mapping and competitor intelligence",
        "Competency-based assessment frameworks",
        "Direct approach to passive senior talent",
        "Retained and contingency models available",
      ],
    },
    {
      name: "Payroll & Compliance",
      slug: "payroll-compliance",
      description: "Managed payroll processing with full statutory compliance for your team.",
      longDescription:
        "Running payroll in-house is time-consuming and error-prone. We manage your entire payroll cycle — salary processing, statutory filings, Form 16 generation, and audit-ready records — so your finance team can focus on strategy instead of spreadsheets.",
      features: [
        "Monthly payroll processing and payslips",
        "PF, ESIC, PT, and TDS filings",
        "Form 16 and year-end tax statements",
        "Leave and attendance integration",
        "Audit-ready compliance records",
      ],
    },
  ],
  industries: [
    {
      name: "Manufacturing",
      slug: "manufacturing",
      description:
        "From shop floor supervisors to plant heads — we staff the full manufacturing hierarchy for discrete, process, and batch production environments.",
    },
    {
      name: "Solar & Renewables",
      slug: "solar-renewables",
      description:
        "Gujarat leads India's renewable push. We place project engineers, EPC coordinators, O&M technicians, and business development talent across solar, wind, and storage projects.",
    },
    {
      name: "Real Estate",
      slug: "real-estate",
      description:
        "Site managers, CRM executives, channel development, and project finance — we understand the unique hiring rhythm of residential and commercial real estate developers.",
    },
    {
      name: "Finance & Accounts",
      slug: "finance-accounts",
      description:
        "Accountants, CA-qualified controllers, tax specialists, and CFO-level leadership — placed across MSMEs, NBFCs, and founder-led businesses.",
    },
    {
      name: "Operations",
      slug: "operations",
      description:
        "Supply chain planners, procurement leads, logistics coordinators, and operations managers who can own the complexity of running a growing business.",
    },
    {
      name: "Sales",
      slug: "sales",
      description:
        "Field sales executives, B2B key account managers, regional heads, and VP-level revenue leaders — we find people who can sell, not just those who say they can.",
    },
  ],
  about: {
    founded: "2023",
    location: "Vadodara, Gujarat",
    mission:
      "To be Gujarat's most trusted recruitment partner for MSMEs and founder-led businesses — delivering talent that moves the needle, not just fills the seat.",
    story:
      "EKVIR was built because Gujarat's growing businesses deserved better than a transactional recruiter. We set up in Vadodara to serve the region's manufacturers, real estate developers, renewable energy companies, and ambitious startups with the same rigour that large enterprises expect from their talent partners.",
    values: [
      {
        title: "Precision over volume",
        body: "We send fewer, better candidates — not a pile of profiles for you to filter.",
      },
      {
        title: "Transparent process",
        body: "You know where every mandate stands. No chasing. No vague updates.",
      },
      {
        title: "Skin in the game",
        body: "Our reputation rides on every placement. That keeps our standards high.",
      },
      {
        title: "Long-term partnerships",
        body: "We measure success in years, not invoices. Your growth is our growth.",
      },
    ],
  },
} as const;

export type Site = typeof site;
export type ServiceSlug = (typeof site.services)[number]["slug"];
export type IndustrySlug = (typeof site.industries)[number]["slug"];
