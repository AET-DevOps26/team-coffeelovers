import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PREFERENCES = [
  {
    id: "popular",
    label: "Popular Attractions",
    bg: "url('/images/popular-attractions.jpg')",
  },
  {
    id: "historical",
    label: "Historical",
    bg: "url('/images/historical.jpg')",
  },
  {
    id: "outdoor",
    label: "Outdoor Activities",
    bg: "url('/images/outdoor-activities.jpg')",
  },
  {
    id: "food",
    label: "Food & Culture",
    bg: "url('/images/food-culture.jpg')",
  },
  {
    id: "mixed",
    label: "Mixed Trip",
    bg: "url('/images/mixed-trip.jpg')",
  },
];

const FEATURES = [
  {
    emoji: "✦",
    title: "AI-Powered",
    description: "Smart recommendations tailored to your preferences",
  },
  {
    emoji: "📍",
    title: "Location-Aware",
    description: "Optimized routes that save you time",
  },
  {
    emoji: "🗓",
    title: "Day-by-Day",
    description: "Structured itineraries for hassle-free planning",
  },
];

const TRIP_TYPE_MAP = {
  popular:    "TOURISTIC",
  historical: "HISTORIC",
  outdoor:    "TOURISTIC",
  food:       "GASTRONOMIC",
  mixed:      "MIXED",
};

function LandingPage() {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preference, setPreference] = useState("popular");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const suggestionsRef = useRef(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (destination.length < 2) { setSuggestions([]); return; }
    const timer = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=10&addressdetails=1`, {
        headers: { "Accept-Language": "en" },
      })
        .then(r => r.json())
        .then(data => {
          const cities = data
            .filter(r => r.class === "place" && ["city", "town", "village", "municipality"].includes(r.type))
            .slice(0, 5)
            .map(r => {
              const city = r.address.city || r.address.town || r.address.village || r.address.municipality || r.name;
              const country = r.address.country;
              return country ? `${city}, ${country}` : city;
            });
          setSuggestions(cities);
          setShowSuggestions(true);
        })
        .catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, [destination]);

  useEffect(() => {
    const handleClick = e => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(rgba(20,25,45,0.55) 0%, rgba(20,25,45,0.08) 40%, rgba(20,25,45,0.08) 60%, rgba(20,25,45,0.55) 100%), url('/images/main-background.jpg') center 60% / cover no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
        overflow: "hidden",
      }}>

        {/* Silhouette layer */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "38%",
          background: "linear-gradient(to top, rgba(8,4,12,0.95) 0%, rgba(8,4,12,0.6) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Navbar */}
        <nav style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 36px",
          zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "#c0622a",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 800, fontSize: 15,
            }}>W</div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "white" }}>WeGO</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <Link to="/plans" style={navLinkStyle}>Plan Trip</Link>
            <Link to="/plans" style={navLinkStyle}>My Plans</Link>
            {token ? (
              <button onClick={handleLogout} style={{
                ...navLinkStyle,
                background: "#c0622a",
                padding: "8px 20px",
                borderRadius: 8,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}>Logout</button>
            ) : (
              <Link to="/login" style={{
                ...navLinkStyle,
                background: "#c0622a",
                padding: "8px 20px",
                borderRadius: 8,
                fontWeight: 700,
              }}>Login</Link>
            )}
          </div>
        </nav>

        {/* Headline */}
        <h1 style={{
          color: "white", fontSize: 52, fontWeight: 800,
          textAlign: "center", marginBottom: 16,
          maxWidth: 620, lineHeight: 1.15,
          position: "relative", zIndex: 1,
        }}>
          Your AI-Powered Travel Planner
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.8)", fontSize: 18,
          textAlign: "center", marginBottom: 48,
          maxWidth: 460, lineHeight: 1.6,
          position: "relative", zIndex: 1,
        }}>
          Create personalized itineraries in minutes with smart recommendations
        </p>

        {/* Form card */}
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: "32px 36px 36px",
          width: "100%",
          maxWidth: 920,
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          position: "relative",
          zIndex: 1,
        }}>

          {/* Destination + Start Date + End Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div ref={suggestionsRef}>
              <label htmlFor="destination" style={labelStyle}>Destination</label>
              <div style={{ position: "relative" }}>
                <span style={inputIconStyle}>📍</span>
                <input
                  id="destination"
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={e => { setDestination(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  style={{ ...inputStyle, paddingLeft: 38 }}
                  autoComplete="off"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul style={{
                    position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
                    background: "white", border: "1px solid #e5e7eb", borderRadius: 10,
                    marginTop: 4, padding: 0, listStyle: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  }}>
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        onMouseDown={() => { setDestination(s); setSuggestions([]); setShowSuggestions(false); }}
                        style={{
                          padding: "10px 14px", fontSize: 14, color: "#1f2937", cursor: "pointer",
                          borderBottom: i < suggestions.length - 1 ? "1px solid #f3f4f6" : "none",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                        onMouseLeave={e => e.currentTarget.style.background = "white"}
                      >
                        📍 {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="startDate" style={labelStyle}>Start Date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                min={today}
                onChange={e => { setStartDate(e.target.value); if (endDate && e.target.value > endDate) setEndDate(""); }}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="endDate" style={labelStyle}>End Date</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                min={startDate || today}
                onChange={e => setEndDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Preference selector */}
          <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 14 }}>
            What kind of experience are you looking for?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
            {PREFERENCES.map(p => (
              <button
                key={p.id}
                onClick={() => setPreference(p.id)}
                style={{
                  position: "relative",
                  height: 130,
                  borderRadius: 12,
                  background: p.bg,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  outline: preference === p.id ? "3px solid #2563EB" : "3px solid transparent",
                  outlineOffset: 2,
                  transition: "outline 0.15s",
                  border: "none",
                  padding: 0,
                  width: "100%",
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: 12,
                }} />
                {preference === p.id && (
                  <div style={{
                    position: "absolute", top: 8, right: 8,
                    width: 22, height: 22,
                    background: "#2563EB",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: 11, fontWeight: 800,
                  }}>✓</div>
                )}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "20px 10px 10px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: "center",
                }}>{p.label}</div>
              </button>
            ))}
          </div>

          {/* Submit */}
          {formError && (
            <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{formError}</p>
          )}
          <button
            disabled={submitting}
            onClick={async () => {
              setFormError("");
              if (!destination || !startDate || !endDate) {
                setFormError("Please fill in destination and dates.");
                return;
              }
              const userId = localStorage.getItem("userId");
              if (!userId) { navigate("/login"); return; }
              setSubmitting(true);
              try {
                const res = await fetch(`${process.env.REACT_APP_TRIP_API_URL}/trips`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                  body: JSON.stringify({
                    userId,
                    destination,
                    startDate,
                    endDate,
                    tripType: TRIP_TYPE_MAP[preference] || "MIXED",
                    budget: 0,
                  }),
                });
                if (!res.ok) throw new Error("Could not create trip.");
                const trip = await res.json();
                const p = new URLSearchParams({ destination, start: startDate, end: endDate, preference, tripId: trip.id });
                navigate(`/itinerary?${p.toString()}`);
              } catch (err) {
                setFormError(err.message);
              } finally {
                setSubmitting(false);
              }
            }}
            style={{
              width: "100%",
              padding: "15px",
              background: "#1e293b",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: submitting ? "not-allowed" : "pointer",
              letterSpacing: "0.02em",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Creating trip…" : "🔍  Plan My Trip"}
          </button>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "72px 24px", background: "#ffffff" }}>
        <div style={{
          maxWidth: 860,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 48,
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ textAlign: "center" }}>
              <div style={{
                width: 76, height: 76,
                background: "#EFF6FF",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
                fontSize: 30,
              }}>{f.emoji}</div>
              <h3 style={{ fontWeight: 700, fontSize: 19, color: "#1f2937", marginBottom: 10 }}>
                {f.title}
              </h3>
              <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, maxWidth: 220, margin: "0 auto" }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 15,
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1.5px solid #E5E7EB",
  borderRadius: 10,
  fontSize: 15,
  color: "#1f2937",
  outline: "none",
  boxSizing: "border-box",
};

const inputIconStyle = {
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 15,
  pointerEvents: "none",
};

export default LandingPage;
