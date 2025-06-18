import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Placeholder search results - replace with actual API call later
  const placeholderResults = [
    {
      id: 1,
      name: "Rose",
      scientificName: "Rosa",
      image: "🌹",
      description: "A woody perennial flowering plant of the genus Rosa.",
    },
    {
      id: 2,
      name: "Cactus",
      scientificName: "Cactaceae",
      image: "🌵",
      description:
        "A member of the plant family Cactaceae, a family comprising about 127 genera.",
    },
    {
      id: 3,
      name: "Tulip",
      scientificName: "Tulipa",
      image: "🌷",
      description:
        "A genus of spring-blooming perennial herbaceous bulbiferous geophytes.",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 pt-8">
      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results
          </h2>
          <p className="text-gray-600">
            Showing results for:{" "}
            <span className="font-semibold">"{query}"</span>
          </p>
        </div>

        {query ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderResults.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className="text-4xl mb-4">{plant.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {plant.name}
                </h3>
                <p className="text-sm text-gray-500 italic mb-3">
                  {plant.scientificName}
                </p>
                <p className="text-gray-600 text-sm">{plant.description}</p>
                <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No search query provided. Use the search bar above to find plants.
            </p>
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
