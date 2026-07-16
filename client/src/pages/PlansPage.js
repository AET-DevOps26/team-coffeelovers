import { useEffect, useState } from "react";
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

const TRIP_TYPE_TO_PREFERENCE = {
  TOURISTIC:   "popular",
  HISTORIC:    "historical",
  GASTRONOMIC: "food",
  MIXED:       "mixed",
};

function getDays(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const diff = new Date(endDate) - new Date(startDate);
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
}

export default function PlansPage() {
  const [tab, setTab] = useState("mine");
  const [plans, setPlans] = useState([]);
  const [sharedPlans, setSharedPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharedLoading, setSharedLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sharedError, setSharedError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (planId) => {
    if (!window.confirm("Delete this trip? This cannot be undone.")) return;
    setDeletingId(planId);
    fetch(`${process.env.REACT_APP_TRIP_API_URL}/trips/${planId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); })
      .then(() => setPlans(prev => prev.filter(p => p.id !== planId)))
      .catch(err => alert(`Could not delete trip: ${err.message}`))
      .finally(() => setDeletingId(null));
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { setLoading(false); setSharedLoading(false); return; }
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_TRIP_API_URL}/trips/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json(); })
      .then(data => {
        setPlans(data.map(t => ({
          id: t.id,
          destination: t.destination,
          startDate: t.startDate,
          endDate: t.endDate,
          preference: TRIP_TYPE_TO_PREFERENCE[t.tripType] || "mixed",
          createdAt: t.createdAt ? t.createdAt.slice(0, 10) : "",
        })));
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });

    fetch(`${process.env.REACT_APP_TRIP_API_URL}/trips/shared/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json(); })
      .then(data => {
        setSharedPlans(data.map(t => ({
          id: t.id,
          tripId: t.tripId,
          destination: t.destination,
          startDate: t.startDate,
          endDate: t.endDate,
          preference: TRIP_TYPE_TO_PREFERENCE[t.tripType] || "mixed",
          authorUsername: t.authorUsername,
          savedAt: t.savedAt ? t.savedAt.slice(0, 10) : "",
        })));
        setSharedLoading(false);
      })
      .catch(err => { setSharedError(err.message); setSharedLoading(false); });
  }, []);

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
        sharedLoading ? (
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading shared plans…</p>
        ) : sharedError ? (
          <p style={{ color: "#dc2626", fontSize: 14 }}>Could not load shared plans: {sharedError}</p>
        ) : sharedPlans.length === 0 ? (
          <p style={{ color: "#9ca3af", fontSize: 14 }}>No plans have been shared with you yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {sharedPlans.map(plan => {
              const days = getDays(plan.startDate, plan.endDate);
              const img = PREFERENCE_IMAGES[plan.preference] || PREFERENCE_IMAGES.popular;
              const prefLabel = PREFERENCE_LABELS[plan.preference] || plan.preference;
              return (
                <div key={plan.id} style={{ background: "white", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <div style={{ height: 160, background: `url('${img}') center/cover no-repeat` }} />
                  <div style={{ padding: "16px 18px 18px" }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{plan.destination}</h2>
                    {plan.authorUsername && (
                      <p style={{ fontSize: 12, color: "#c0622a", fontWeight: 600, margin: "0 0 6px" }}>Shared by {plan.authorUsername}</p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
                      <span>📅</span>
                      {Boolean(days) && <span>{days} day{days === 1 ? "" : "s"}</span>}
                      <span style={{ color: "#c0622a", fontWeight: 600 }}>{prefLabel}</span>
                    </div>
                    <button
                      onClick={() => {
                        const p = new URLSearchParams({ destination: plan.destination, start: plan.startDate, end: plan.endDate, preference: plan.preference, tripId: plan.tripId });
                        navigate(`/itinerary?${p.toString()}`);
                      }}
                      style={{ width: "100%", padding: "11px", background: "#1e293b", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 10 }}
                    >View Itinerary</button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : loading ? (
        <p style={{ color: "#6b7280", fontSize: 14 }}>Loading your plans…</p>
      ) : error ? (
        <p style={{ color: "#dc2626", fontSize: 14 }}>Could not load plans: {error}</p>
      ) : plans.length === 0 ? (
        <p style={{ color: "#9ca3af", fontSize: 14 }}>No trips yet. <a href="/" style={{ color: "#c0622a", fontWeight: 600 }}>Plan your first trip!</a></p>
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
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => {
                        const p = new URLSearchParams({ destination: plan.destination, start: plan.startDate, end: plan.endDate, preference: plan.preference, tripId: plan.id });
                        navigate(`/itinerary?${p.toString()}`);
                      }}
                      style={{
                        flex: 1, padding: "11px",
                        background: "#1e293b", color: "white",
                        border: "none", borderRadius: 10,
                        fontSize: 14, fontWeight: 700, cursor: "pointer",
                      }}
                    >View Itinerary</button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      disabled={deletingId === plan.id}
                      title="Delete trip"
                      style={{
                        padding: "11px 13px",
                        background: deletingId === plan.id ? "#f3f4f6" : "#fff0f0",
                        color: "#dc2626",
                        border: "1.5px solid #fecaca",
                        borderRadius: 10,
                        fontSize: 16,
                        cursor: deletingId === plan.id ? "not-allowed" : "pointer",
                        opacity: deletingId === plan.id ? 0.5 : 1,
                      }}
                    >{deletingId === plan.id ? "…" : "🗑"}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
