import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/NavBar";

// ---------------------------------------------------------------------------
// Mock itinerary — same shape the AI service will eventually return
// ---------------------------------------------------------------------------
const MOCK_ITINERARY = {
  days: [
    {
      day: 1,
      title: "Gothic Quarter & La Rambla",
      activities: [
        {
          id: 1,
          name: "La Sagrada Família",
          description: "Start your adventure at Gaudí's masterpiece. Book tickets in advance to avoid long queues.",
          time: "9:00 AM",
          duration: "2-3 hours",
          period: "MORNING",
        },
        {
          id: 2,
          name: "Casa Batlló",
          description: "Another Gaudí marvel on Passeig de Gràcia, featuring stunning architecture and rooftop views.",
          time: "11:30 AM",
          duration: "1.5 hours",
          period: "MORNING",
        },
        {
          id: 3,
          name: "Gothic Quarter Walking Tour",
          description: "Explore the narrow medieval streets, visit the Barcelona Cathedral, and discover hidden squares.",
          time: "2:00 PM",
          duration: "2 hours",
          period: "AFTERNOON",
        },
        {
          id: 4,
          name: "La Boqueria Market",
          description: "Famous market on La Rambla with fresh produce, tapas, and local specialties.",
          time: "4:30 PM",
          duration: "1 hour",
          period: "AFTERNOON",
        },
      ],
    },
    {
      day: 2,
      title: "Barceloneta & Park Güell",
      activities: [
        {
          id: 5,
          name: "Park Güell",
          description: "Explore Gaudí's colorful mosaic park with panoramic views over the city.",
          time: "9:00 AM",
          duration: "2 hours",
          period: "MORNING",
        },
        {
          id: 6,
          name: "Barceloneta Beach",
          description: "Relax on Barcelona's most famous beach and enjoy fresh seafood at a beachfront restaurant.",
          time: "12:00 PM",
          duration: "2 hours",
          period: "AFTERNOON",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
const PERIOD_START_MINUTES = { MORNING: 9 * 60, AFTERNOON: 13 * 60, EVENING: 18 * 60 };

function parseDurationMinutes(duration) {
  const match = /(\d+(?:\.\d+)?)/.exec(duration);
  return match ? Math.round(Number.parseFloat(match[1]) * 60) : 60;
}

function formatTime(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const suffix = hours24 < 12 ? "AM" : "PM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

// Optimistic client-side preview: activities are grouped by period in array
// order, and each one's displayed time is derived from its period's start
// time plus the cumulative duration of the activities scheduled before it.
// The Planning Service will own the authoritative recalculation once it persists itineraries.
function recalculateTimes(activities) {
  const cursor = { ...PERIOD_START_MINUTES };
  return activities.map(activity => {
    const start = cursor[activity.period];
    cursor[activity.period] = start + parseDurationMinutes(activity.duration);
    return { ...activity, time: formatTime(start) };
  });
}

const DEFAULT_CENTER = [41.3851, 2.1734]; // Barcelona fallback

export default function ItineraryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const PREFERENCE_LABELS = {
    popular: "Popular Attractions",
    historical: "Historical",
    outdoor: "Outdoor Activities",
    food: "Food & Culture",
    mixed: "Mixed Trip",
  };

  const destination = searchParams.get("destination") || location.state?.destination || "Barcelona";
  const startDate   = searchParams.get("start")       || location.state?.startDate;
  const endDate     = searchParams.get("end")         || location.state?.endDate;
  const preference  = searchParams.get("preference")  || location.state?.preference || "popular";
  const preferenceLabel = PREFERENCE_LABELS[preference] || preference;

  const [itinerary, setItinerary] = useState(MOCK_ITINERARY);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom] = useState(13);
  const [toast, setToast] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleRemoveActivity = (dayIndex, activityId) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map((day, i) => i !== dayIndex
        ? day
        : { ...day, activities: day.activities.filter(a => a.id !== activityId) }
      ),
    }));
    showToast("Activity removed");
  };

  const handleMoveActivity = (sourceDayIndex, sourceActivityId, targetDayIndex, targetActivityId) => {
    if (sourceDayIndex === targetDayIndex && sourceActivityId === targetActivityId) return;
    setItinerary(prev => {
      const sourceDay = prev.days[sourceDayIndex];
      const targetDay = prev.days[targetDayIndex];
      const dragged = sourceDay?.activities.find(a => a.id === sourceActivityId);
      const target = targetDay?.activities.find(a => a.id === targetActivityId);
      if (!dragged || !target) return prev;

      const moved = dragged.period === target.period ? dragged : { ...dragged, period: target.period };

      let sourceActivities = sourceDay.activities.filter(a => a.id !== sourceActivityId);
      let targetActivities = sourceDayIndex === targetDayIndex ? sourceActivities : [...targetDay.activities];
      const toIdx = targetActivities.findIndex(a => a.id === targetActivityId);
      targetActivities.splice(toIdx, 0, moved);

      sourceActivities = recalculateTimes(sourceActivities);
      targetActivities = sourceDayIndex === targetDayIndex ? sourceActivities : recalculateTimes(targetActivities);

      return {
        ...prev,
        days: prev.days.map((day, i) => {
          if (i === sourceDayIndex && i === targetDayIndex) return { ...day, activities: targetActivities };
          if (i === sourceDayIndex) return { ...day, activities: sourceActivities };
          if (i === targetDayIndex) return { ...day, activities: targetActivities };
          return day;
        }),
      };
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    const saved = JSON.parse(localStorage.getItem("savedPlans") || "[]");
    const plan = { id: Date.now(), destination, startDate, endDate, preference, createdAt: new Date().toISOString().slice(0,10), itinerary };
    const already = saved.findIndex(p => p.destination === destination && p.startDate === startDate && p.endDate === endDate);
    if (already === -1) saved.unshift(plan); else saved[already] = plan;
    localStorage.setItem("savedPlans", JSON.stringify(saved));
    showToast("Plan saved!");
  };

  const buildShareUrl = () => {
    const p = new URLSearchParams({ destination, start: startDate || "", end: endDate || "", preference });
    return `${window.location.origin}/itinerary?${p.toString()}`;
  };

  const handleShareSend = () => {
    if (!shareEmail) return;
    navigator.clipboard.writeText(buildShareUrl()).catch(() => {});
    setShareOpen(false);
    setShareEmail("");
    showToast(`Link sent to ${shareEmail}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(buildShareUrl()).then(() => {
      setShareOpen(false);
      showToast("Link copied!");
    }).catch(() => showToast("Copy failed"));
  };

  // Geocode the destination using free Nominatim API
  useEffect(() => {
    if (!destination) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`,
      { headers: { "Accept-Language": "en" } }
    )
      .then(r => r.json())
      .then(data => {
        if (data[0]) setMapCenter([Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)]);
      })
      .catch(() => {});
  }, [destination]);

  const formatDateRange = () => {
    if (!startDate && !endDate) return "";
    const fmt = d => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    return `${fmt(startDate)} – ${fmt(endDate)} · ${preferenceLabel}`;
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f3f4f6", minHeight: "100vh" }}>

      <Navbar />

      {/* ── Header card ── */}
      <div style={{ maxWidth: 860, margin: "24px auto 28px", padding: "0 24px" }}>
      <div style={{
        background: "linear-gradient(180deg, #2d3748 0%, #3d4f61 100%)",
        padding: "36px 32px 32px",
        position: "relative",
        borderRadius: 16,
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute", top: 24, left: 24,
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "50%", width: 38, height: 38,
            color: "white", fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >←</button>

        <div style={{ textAlign: "center", padding: "4px 160px" }}>
          <h1 style={{ color: "white", fontSize: 42, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.5px" }}>
            {destination}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, margin: 0 }}>
            {formatDateRange()}
          </p>
        </div>

        <div style={{ position: "absolute", top: 24, right: 24, display: "flex", gap: 10 }}>
          <button onClick={handleSave} style={headerBtnStyle}>Save Plan</button>
          <button onClick={() => setShareOpen(true)} style={{ ...headerBtnStyle, background: "white", color: "#1e293b" }}>Share Plan</button>
        </div>
      </div>
      </div>

      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          background: "#1e293b", color: "white", padding: "10px 22px",
          borderRadius: 10, fontSize: 14, fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)", zIndex: 999,
        }}>{toast}</div>
      )}

      {shareOpen && (
        <>
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000,
          }} />
          <dialog open aria-labelledby="share-modal-title" style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white", borderRadius: 16, padding: "32px 36px",
            width: 380, border: "none",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)", zIndex: 1001,
          }}>
            <button onClick={() => setShareOpen(false)} style={{
              position: "absolute", top: 14, right: 16,
              background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9ca3af",
            }}>✕</button>
            <h3 id="share-modal-title" style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800, color: "#111827" }}>Share Plan</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "#6b7280" }}>Send this itinerary to a friend via email</p>
            <label htmlFor="share-email" style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Email address</label>
            <input
              id="share-email"
              type="email"
              placeholder="email@example.com"
              value={shareEmail}
              onChange={e => setShareEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleShareSend()}
              style={{
                width: "100%", padding: "11px 14px",
                border: "1.5px solid #e5e7eb", borderRadius: 10,
                fontSize: 14, color: "#1f2937", outline: "none",
                boxSizing: "border-box", marginBottom: 12,
              }}
            />
            <button onClick={handleShareSend} style={{
              width: "100%", padding: "12px",
              background: "#1e293b", color: "white", border: "none",
              borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 10,
            }}>Send Link</button>
            <button onClick={handleCopyLink} style={{
              width: "100%", padding: "12px",
              background: "none", color: "#6b7280", border: "1.5px solid #e5e7eb",
              borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>Copy link instead</button>
          </dialog>
        </>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* ── Map ── */}
        <div style={sectionCard}>
          <h3 style={sectionTitle}>Activity Map</h3>
          <div style={{ borderRadius: 12, overflow: "hidden", height: 300 }}>
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
              key={mapCenter.toString()}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              />
            </MapContainer>
          </div>
        </div>

        {/* ── Days ── */}
        {itinerary.days.map((day, dayIndex) => (
          <DayCard
            key={day.day}
            day={day}
            dayIndex={dayIndex}
            onMoveActivity={handleMoveActivity}
            onRemoveActivity={handleRemoveActivity}
          />
        ))}
      </div>
    </div>
  );
}

function DayCard({ day, dayIndex, onMoveActivity, onRemoveActivity }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 16 }}>
        Day {day.day}: {day.title}
      </h2>

      {["MORNING", "AFTERNOON", "EVENING"].map(period => {
        const acts = day.activities.filter(a => a.period === period);
        if (!acts.length) return null;
        return (
          <div key={period} style={{ marginBottom: 16 }}>
            <p style={periodLabel}>{period}</p>
            <div style={sectionCard}>
              {acts.map((act, i) => (
                <ActivityRow
                  key={act.id}
                  activity={act}
                  showDivider={i < acts.length - 1}
                  isDragging={draggedId === act.id}
                  isDragOver={dragOverId === act.id && draggedId !== act.id}
                  onDragStart={e => {
                    e.dataTransfer.setData("text/plain", JSON.stringify({ dayIndex, id: act.id }));
                    e.dataTransfer.effectAllowed = "move";
                    // Defer the opacity change so the browser snapshots the
                    // drag preview before the dragged row fades out — doing
                    // it synchronously causes a ghosted/overlapping preview.
                    setTimeout(() => setDraggedId(act.id), 0);
                  }}
                  onDragEnd={() => { setDraggedId(null); setDragOverId(null); }}
                  onDragOver={() => { if (dragOverId !== act.id) setDragOverId(act.id); }}
                  onDrop={e => {
                    let source;
                    try { source = JSON.parse(e.dataTransfer.getData("text/plain")); } catch { /* ignore */ }
                    if (source && Number.isInteger(source.dayIndex) && source.id !== act.id) {
                      onMoveActivity(source.dayIndex, source.id, dayIndex, act.id);
                    }
                    setDraggedId(null);
                    setDragOverId(null);
                  }}
                  onRemove={() => onRemoveActivity(dayIndex, act.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActivityRow({ activity, showDivider, isDragging, isDragOver, onDragStart, onDragEnd, onDragOver, onDrop, onRemove }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={e => { e.preventDefault(); onDragOver(); }}
      onDrop={e => { e.preventDefault(); onDrop(e); }}
      style={{
        opacity: isDragging ? 0.4 : 1,
        borderTop: isDragOver ? "2px solid #2563eb" : "2px solid transparent",
        transition: "opacity 0.15s, border-color 0.1s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0" }}>
        <div style={dragHandle} title="Drag to reorder">⠿</div>
        <div style={clockIcon}>🕐</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#111827", margin: "0 0 4px" }}>{activity.name}</p>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 6px", lineHeight: 1.5 }}>{activity.description}</p>
              <span style={durationBadge}>{activity.duration}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginLeft: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{activity.time}</span>
              <button style={iconBtn} title="Suggest alternative">↺</button>
              <button onClick={onRemove} style={iconBtn} title="Remove">🗑</button>
            </div>
          </div>
        </div>
      </div>
      {showDivider && <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: 0 }} />}
    </div>
  );
}

const sectionCard   = { background: "white", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 12 };
const sectionTitle  = { fontSize: 15, fontWeight: 600, color: "#374151", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 };
const periodLabel   = { fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#f97316", margin: "0 0 8px" };
const clockIcon     = { width: 36, height: 36, background: "#f9fafb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 };
const durationBadge = { fontSize: 11, fontWeight: 600, color: "#f97316", background: "#fff7ed", padding: "2px 8px", borderRadius: 20 };
const iconBtn       = { background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#9ca3af", padding: 2 };
const dragHandle    = { fontSize: 18, lineHeight: "36px", color: "#cbd5e1", cursor: "grab", flexShrink: 0, userSelect: "none" };
const headerBtnStyle = { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, color: "white", padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
