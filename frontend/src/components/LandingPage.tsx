import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-green-800 mb-8">
          🌱 Plant Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Discover and learn about plants from around the world
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for plants (e.g., 'rose', 'cactus', 'tulip')"
              className="w-full px-6 py-4 text-lg border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-8 text-sm text-gray-500">
          <p>Popular searches: rose, cactus, tulip, sunflower, orchid</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
