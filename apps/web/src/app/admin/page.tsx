"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type LeadStatus = "new" | "contacted" | "qualified" | "rejected" | "hired";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "qualified", "rejected", "hired"];

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  qualified: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  hired: "bg-[#C2A96A]/15 text-[#7A5C1E]",
};

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ekvir_token");
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeads = useCallback(async () => {
    const token = getToken();
    setLoading(true);
    setError("");
    try {
      const qs = filter ? `&status=${filter}` : "";
      const res = await fetch(`${API}/api/leads?limit=100${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("ekvir_token");
        router.replace("/admin/login");
        return;
      }
      const json = (await res.json()) as {
        success: boolean;
        data: { leads: Lead[] };
      };
      setLeads(json.data.leads);
    } catch {
      setError("Failed to load leads. Is the API running?");
    } finally {
      setLoading(false);
    }
  }, [filter, router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  async function updateStatus(id: string, status: LeadStatus) {
    const token = getToken();
    const res = await fetch(`${API}/api/leads/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    }
  }

  function logout() {
    localStorage.removeItem("ekvir_token");
    router.replace("/admin/login");
  }

  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => { acc[s] = leads.filter((l) => l.status === s).length; return acc; },
    {} as Record<LeadStatus, number>
  );

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#C2A96A]/20 bg-[#F7F5EF]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <p className="font-heading text-xl font-light text-[#2B2B2B]">EKVIR Admin</p>
          <button
            onClick={logout}
            className="font-body text-xs text-[#8A8375] hover:text-[#2B2B2B] transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        {/* Analytics */}
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-5">
            Overview
          </p>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-5">
              <p className="font-heading text-4xl font-light text-[#C2A96A]">{leads.length}</p>
              <p className="font-body text-xs text-[#8A8375] mt-1">Total</p>
            </div>
            {STATUS_OPTIONS.map((s) => (
              <div key={s} className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-5">
                <p className="font-heading text-4xl font-light text-[#2B2B2B]">{counts[s]}</p>
                <p className="font-body text-xs text-[#8A8375] mt-1 capitalize">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("")}
            className={`rounded-full px-4 py-1.5 font-body text-xs transition-colors ${
              filter === ""
                ? "bg-[#2B2B2B] text-white"
                : "border border-[#2B2B2B]/20 text-[#8A8375] hover:border-[#C2A96A] hover:text-[#C2A96A]"
            }`}
          >
            All ({leads.length})
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 font-body text-xs capitalize transition-colors ${
                filter === s
                  ? "bg-[#C2A96A] text-white"
                  : "border border-[#2B2B2B]/20 text-[#8A8375] hover:border-[#C2A96A] hover:text-[#C2A96A]"
              }`}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <p className="font-body text-sm text-[#8A8375]">Loading leads…</p>
        ) : error ? (
          <p className="font-body text-sm text-red-600">{error}</p>
        ) : leads.length === 0 ? (
          <div className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 py-16 text-center">
            <p className="font-heading text-2xl font-light text-[#2B2B2B]">No leads yet.</p>
            <p className="mt-2 font-body text-sm text-[#8A8375]">
              Submissions from the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#C2A96A]/20 bg-white/60">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-[#C2A96A]/10">
                  {["Name", "Contact", "Company", "Industry", "Message", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-widest text-[#8A8375]"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-b border-[#C2A96A]/10 last:border-0 hover:bg-[#C2A96A]/5 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-[#2B2B2B] whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[#2B2B2B]">{lead.email}</p>
                      <p className="text-[#8A8375]">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-[#8A8375]">{lead.company ?? "—"}</td>
                    <td className="px-5 py-4 text-[#8A8375]">{lead.industry ?? "—"}</td>
                    <td className="px-5 py-4 text-[#8A8375] max-w-[180px] truncate" title={lead.message}>
                      {lead.message ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value as LeadStatus)}
                        className={`rounded-full px-3 py-1 text-xs font-medium cursor-pointer border-0 outline-none appearance-none ${STATUS_STYLES[lead.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-white text-[#2B2B2B]">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-[#8A8375] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
