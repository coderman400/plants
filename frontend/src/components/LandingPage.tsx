import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePlantsFromGoogleSheet } from "@/lib/usePlantsFromGoogleSheet";
import type { Plant } from "@/lib/usePlantsFromGoogleSheet";
import SearchBar from "./SearchBar";

const heroImage = "/leaves2.jpg";

function extractKeywords(plants: Plant[]): string[] {
  const keywordSet = new Set<string>();
  plants.forEach((plant: Plant) => {
    [
      plant.name,
      plant.scientific,
      plant.soilType,
      plant.location,
      plant.description,
      plant.moreInfo,
      plant.moreInfoLink,
      plant.gpsLocation,
      plant.genus,
      plant.genotype,
      plant.phenotype,
      plant.importance,
      plant.localNames,
      plant.serial,
      plant.status,
      plant.category,
      plant.floweringTime,
    ]
      .filter((field): field is string => Boolean(field))
      .forEach((field) => {
        field
          .split(/,|\s|\//)
          .map((s) => s.trim().toLowerCase())
          .filter((word): word is string => Boolean(word))
          .forEach((word) => keywordSet.add(word));
      });
  });
  return Array.from(keywordSet).filter((k) => k.length > 2);
}

const LandingPage = () => {
  const navigate = useNavigate();
  const { plants } = usePlantsFromGoogleSheet();
  const keywords = useMemo(() => extractKeywords(plants), [plants]);

  const handleTagSearch = (tags: string[]) => {
    if (tags.length > 0) {
      // Pass tags as comma-separated in query param
      navigate(`/search?tags=${encodeURIComponent(tags.join(","))}`);
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
            Just search with names, scientific names, soil types, genotypes,
            whatever you want!
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
        <div className="absolute bottom-6 right-6 bg-white/90 shadow-lg rounded-xl p-6 flex flex-col gap-2 w-[90vw] max-w-md border border-gray-100 backdrop-blur-md">
          <SearchBar whitelist={keywords} onChange={handleTagSearch} />
        </div>
      </div>

      {/* Mobile: Centered Search Bar below heading */}
      <div className="block md:hidden w-full px-4 mt-8">
        <div className="bg-white/90 shadow-lg rounded-xl p-4 flex flex-col gap-2 w-full max-w-md mx-auto border border-gray-100 backdrop-blur-md">
          <SearchBar whitelist={keywords} onChange={handleTagSearch} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
