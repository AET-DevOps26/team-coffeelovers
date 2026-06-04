import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PREFERENCE_LABELS = {
  popular: "Popular Attractions",
  historical: "Historical",
  outdoor: "Outdoor Activities",
  food: "Food & Culture",
  mixed: "Mixed Trip",
};

const PREFERENCE_IMAGES = {
  popular: "/images/popular-attractions.jpg",
  historical: "/images/historical.jpg",
  outdoor: "/images/outdoor-activities.jpg",
  food: "/images/food-culture.jpg",
  mixed: "/images/mixed-trip.jpg",
};

const SAMPLE_PLANS = [
  { id: 1, destination: "Paris", startDate: "2026-05-01", endDate: "2026-05-05", preference: "popular", createdAt: "2026-05-01" },
  { id: 2, destination: "Rome", startDate: "2026-04-28", endDate: "2026-05-01", preference: "historical", createdAt: "2026-04-28" },
  { id: 3, destination: "Barcelona", startDate: "2026-04-25", endDate: "2026-04-27", preference: "mixed", createdAt: "2026-04-25" },
];

function getDays(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const diff = new Date(endDate) - new Date(startDate);
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
}

export default function PlansPage() {
  const [tab, setTab] = useState("mine");
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("savedPlans") || "[]");
  const plans = saved.length > 0 ? saved : SAMPLE_PLANS;

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: "32px 36px", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>My Plans</h1>
      <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 24px" }}>View and manage your travel itineraries</p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e5e7eb", marginBottom: 28 }}>
        {[{ id: "mine", label: "My Plans" }, { id: "shared", label: "Shared with me" }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 20px", fontWeight: 600, fontSize: 14,
              color: tab === t.id ? "#c0622a" : "#6b7280",
              borderBottom: tab === t.id ? "2px solid #c0622a" : "2px solid transparent",
              marginBottom: -2,
            }}
          >{t.label}</button>
        ))}
      </div>

      {tab === "shared" ? (
        <p style={{ color: "#9ca3af", fontSize: 14 }}>No plans have been shared with you yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {plans.map(plan => {
            const days = getDays(plan.startDate, plan.endDate);
            const img = PREFERENCE_IMAGES[plan.preference] || PREFERENCE_IMAGES.popular;
            const prefLabel = PREFERENCE_LABELS[plan.preference] || plan.preference;
            const created = plan.createdAt
              ? new Date(plan.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : "";

            return (
              <div key={plan.id} style={{
                background: "white", borderRadius: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden",
              }}>
                <div style={{
                  height: 160, background: `url('${img}') center/cover no-repeat`,
                }} />
                <div style={{ padding: "16px 18px 18px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>{plan.destination}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
                    <span>📅</span>
                    {Boolean(days) && <span>{days} day{days === 1 ? "" : "s"}</span>}
                    <span style={{ color: "#c0622a", fontWeight: 600 }}>{prefLabel}</span>
                  </div>
                  {created && (
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 14px" }}>Created {created}</p>
                  )}
                  <button
                    onClick={() => {
                      const p = new URLSearchParams({ destination: plan.destination, start: plan.startDate, end: plan.endDate, preference: plan.preference });
                      navigate(`/itinerary?${p.toString()}`);
                    }}
                    style={{
                      width: "100%", padding: "11px",
                      background: "#1e293b", color: "white",
                      border: "none", borderRadius: 10,
                      fontSize: 14, fontWeight: 700, cursor: "pointer",
                    }}
                  >View Itinerary</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
