import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#c0622a" : "#1f2937",
    fontWeight: 600,
    fontSize: 15,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 36px",
      background: "white",
      borderBottom: "1px solid #e5e7eb",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "#c0622a",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 800, fontSize: 15,
        }}>W</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#1f2937" }}>WeGO</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <NavLink to="/plans" style={linkStyle}>Plan Trip</NavLink>
        <NavLink to="/plans" style={linkStyle}>My Plans</NavLink>
        {token ? (
          <button onClick={handleLogout} style={{
            background: "#c0622a", color: "white",
            border: "none", borderRadius: 8,
            padding: "8px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer",
          }}>Logout</button>
        ) : (
          <Link to="/login" style={{
            background: "#c0622a", color: "white",
            textDecoration: "none", borderRadius: 8,
            padding: "8px 20px", fontWeight: 700, fontSize: 15,
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;