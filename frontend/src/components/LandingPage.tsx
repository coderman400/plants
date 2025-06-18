import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const heroImage = "/leaves2.jpg";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white py-8">
      {/* Hero Section */}
      <div className="px-4 flex flex-col w-full md:w-4/5 mx-auto md:flex-row h-auto md:h-80 items-center justify-between gap-8">
        <div className="flex-1 w-full">
          <h1 className="font-bebas text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 mb-6 leading-tight text-center md:text-left">
            FIND PLANTS
            <br />
            ONLY AT <span className="text-green-700">PEEPEEPLANTS</span>
          </h1>
        </div>
        {/* Hide fluff content on mobile */}
        <div className="hidden md:flex flex-1 flex-col items-end gap-6">
          <p className="text-lg text-gray-600 max-w-md mb-2">
            Just search with names, scientific names, or even soil types!
          </p>
        </div>
      </div>

      {/* Desktop/Tablet: Hero Image with Search Card */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-xl mt-6 hidden md:block">
        <img
          src={heroImage}
          alt="Leaves Hero"
          className="w-full h-full object-cover"
        />
        {/* Search Bar Card (desktop/tablet) */}
        <div
          ref={searchBarRef}
          className="absolute bottom-6 right-6 bg-white/90 shadow-lg rounded-xl p-6 flex flex-col gap-2 w-[90vw] max-w-md border border-gray-100 backdrop-blur-md"
        >
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for plants"
                className="w-full px-5 py-3 pr-12 text-base border-2 border-green-200 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white shadow-sm"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-green-100"
              >
                <svg
                  className="w-5 h-5 text-gray-500 hover:text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </div>
          </form>
          <span className="text-xs text-gray-400 mt-1">
            Try some random shit bruh
          </span>
        </div>
      </div>

      {/* Mobile: Centered Search Bar below heading */}
      <div ref={searchBarRef} className="block md:hidden w-full px-4 mt-8">
        <div className="bg-white/90 shadow-lg rounded-xl p-4 flex flex-col gap-2 w-full max-w-md mx-auto border border-gray-100 backdrop-blur-md">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for plants (e.g., 'rose', 'cactus', 'tulip')"
                className="w-full px-5 py-3 pr-12 text-base border-2 border-green-200 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white shadow-sm"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-green-100"
              >
                <svg
                  className="w-5 h-5 text-gray-500 hover:text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </div>
          </form>
          <span className="text-xs text-gray-400 mt-1">
            Try: rose, cactus, tulip, sunflower, orchid
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
