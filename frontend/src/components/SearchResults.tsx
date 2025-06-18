import { useSearchParams, Link } from "react-router-dom";
import { usePlantsFromGoogleSheet } from "@/lib/usePlantsFromGoogleSheet";
import type { Plant } from "@/lib/usePlantsFromGoogleSheet";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { plants, loading } = usePlantsFromGoogleSheet();

  // Read tags from the URL query param
  const tagsParam = searchParams.get("tags") || "";
  const selectedTags = tagsParam
    ? tagsParam
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Filter plants by all selected tags in any field
  const filteredPlants = useMemo(() => {
    if (!selectedTags.length) return plants;
    return plants.filter((plant: Plant) =>
      selectedTags.every((tag: string) =>
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
          .some((field) => field.toLowerCase().includes(tag.toLowerCase()))
      )
    );
  }, [plants, selectedTags]);

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-bebas text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Search Results
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : filteredPlants.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No results found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <Link
                to={`/plant/${plant.id}`}
                key={plant.id}
                className="relative rounded-2xl overflow-hidden shadow-md group h-72 flex flex-col justify-end transition-transform duration-200 hover:scale-105"
                style={{
                  backgroundImage: `url(${plant.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-200" />
                {/* Content */}
                <div className="relative z-10 p-5 flex flex-col h-full justify-end">
                  <div>
                    <h3 className="font-bebas text-white text-2xl md:text-3xl mb-1 drop-shadow-lg uppercase">
                      {plant.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-2 font-sans drop-shadow">
                      {plant.scientific}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Placeholder for pagination */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2">
            <Button
              variant="outline"
              className="px-3 py-1 text-gray-500 hover:text-gray-700"
            >
              Previous
            </Button>
            <span className="px-3 py-1 bg-green-600 text-white rounded">1</span>
            <Button
              variant="outline"
              className="px-3 py-1 text-gray-500 hover:text-gray-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
