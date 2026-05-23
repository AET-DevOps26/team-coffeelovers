import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import MyPlansPage from "./pages/PlansPage";
import ExplorePage from "./pages/ExplorePage";

function AppLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "32px" }}>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/plans"
        element={<AppLayout><MyPlansPage /></AppLayout>}
      />
      <Route
        path="/explore"
        element={<AppLayout><ExplorePage /></AppLayout>}
      />
    </Routes>
  );
}

export default App;
