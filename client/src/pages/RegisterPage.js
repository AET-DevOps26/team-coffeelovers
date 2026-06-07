import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <DecorativeIcons />
      <div style={cardStyle}>
        <Logo />
        <h2 style={titleStyle}>Create Account</h2>
        <p style={subtitleStyle}>Join us and start planning</p>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={fieldStyle}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <div style={inputWrapStyle}>
              <span style={iconStyle}>👤</span>
              <input
                id="username"
                type="text"
                placeholder="your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <div style={inputWrapStyle}>
              <span style={iconStyle}>✉</span>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="reg-password" style={labelStyle}>Password</label>
            <div style={inputWrapStyle}>
              <svg style={{ width: 16, height: 16, marginRight: 8, flexShrink: 0, color: "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            {password.length > 0 && (
              <p style={{
                ...requirementStyle,
                color: password.length >= 6 ? "#16a34a" : "#dc2626",
              }}>
                {password.length >= 6 ? "✓" : "✗"} At least 6 characters
              </p>
            )}
          </div>

          <div style={fieldStyle}>
            <label htmlFor="confirm-password" style={labelStyle}>Confirm Password</label>
            <div style={inputWrapStyle}>
              <svg style={{ width: 16, height: 16, marginRight: 8, flexShrink: 0, color: "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={switchStyle}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>Login</Link>
        </p>
        <Link to="/" style={backStyle}>← Back to landing</Link>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", background: "#c0622a",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontWeight: 800, fontSize: 14,
      }}>W</div>
      <span style={{ fontWeight: 700, fontSize: 16, color: "#1f2937" }}>WeGO</span>
    </div>
  );
}

function DecorativeIcons() {
  return (
    <>
      <span style={{ ...decoStyle, top: "8%",   left: "6%",  fontSize: 40, color: "#c0a060" }}>✦</span>
      <span style={{ ...decoStyle, bottom: "8%",  left: "5%",  fontSize: 32, color: "#93c5fd" }}>▲▲</span>
      <span style={{ ...decoStyle, bottom: "18%", right: "3%", fontSize: 40, color: "#f9a825" }}>🏠</span>
      <span style={{ ...decoStyle, top: "12%",  right: "5%", fontSize: 28, color: "#9ca3af" }}>⌖</span>
      <span style={{ ...decoStyle, top: "35%",  left: "3%",  fontSize: 28, color: "#9ca3af" }}>⌖</span>
    </>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#eeece8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
};

const cardStyle = {
  background: "white",
  borderRadius: 20,
  padding: "40px 44px",
  width: "100%",
  maxWidth: 420,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  position: "relative",
  zIndex: 1,
};

const titleStyle    = { fontSize: 26, fontWeight: 800, color: "#111827", margin: "0 0 6px" };
const subtitleStyle = { fontSize: 14, color: "#6b7280", margin: "0 0 28px" };
const fieldStyle    = { width: "100%", marginBottom: 18 };
const labelStyle    = { display: "block", fontSize: 13, fontWeight: 600, color: "#2563eb", marginBottom: 6 };

const inputWrapStyle = {
  display: "flex", alignItems: "center",
  border: "1.5px solid #e5e7eb", borderRadius: 10,
  padding: "0 14px", background: "white",
};

const iconStyle  = { fontSize: 15, color: "#9ca3af", marginRight: 8, flexShrink: 0 };

const btnStyle = {
  width: "100%", padding: "14px",
  background: "#1e293b", color: "white",
  border: "none", borderRadius: 10,
  fontSize: 15, fontWeight: 700, cursor: "pointer",
  marginTop: 8,
};

const switchStyle = { fontSize: 13, color: "#6b7280", margin: "20px 0 8px" };
const linkStyle   = { color: "#1e293b", fontWeight: 700, textDecoration: "underline" };
const backStyle   = { fontSize: 13, color: "#9ca3af", textDecoration: "none" };
const errorStyle  = { color: "#dc2626", fontSize: 13, marginBottom: 8, textAlign: "center" };
const requirementStyle = { fontSize: 12, marginTop: 6, marginBottom: 0 };
const decoStyle   = { position: "absolute", userSelect: "none", pointerEvents: "none", opacity: 0.7 };

export default RegisterPage;
