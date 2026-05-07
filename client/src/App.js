import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MyPlansPage from "./pages/PlansPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: "32px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plans" element={<MyPlansPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;