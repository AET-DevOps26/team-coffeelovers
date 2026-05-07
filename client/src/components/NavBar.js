import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "white" : "#1f2937",
    backgroundColor: isActive ? "#2563eb" : "#f3f4f6",
    fontWeight: "600"
  });

  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px 32px",
        borderBottom: "1px solid #e5e7eb",
        alignItems: "center"
      }}
    >
      <h2 style={{ marginRight: "32px" }}>WeGO</h2>

      <NavLink to="/" style={linkStyle}>
        Home Page
      </NavLink>

      <NavLink to="/plans" style={linkStyle}>
        My Plans
      </NavLink>

      <NavLink to="/explore" style={linkStyle}>
        Explore
      </NavLink>
    </nav>
  );
}

export default Navbar;