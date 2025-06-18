import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SearchResults from "./components/SearchResults";
import Navbar from "./components/Navbar";
import PlantDetail from "./components/PlantDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
