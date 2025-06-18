import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plantResults = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    subtitle: "Lidah Mertua",
    price: 120,
    image: "/plants/monstera.jpg",
  },
  {
    id: 2,
    name: "Ficus Lyrata",
    subtitle: "Fiddle Leaf Fig",
    price: 240,
    image: "/plants/ficus.jpg",
  },
  {
    id: 3,
    name: "Begonia Rex",
    subtitle: "Begonia",
    price: 360,
    image: "/plants/begonia.jpg",
  },
  {
    id: 4,
    name: "Begonia Rex",
    subtitle: "Begonia",
    price: 360,
    image: "/plants/begonia.jpg",
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-bebas text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Search Results
          </h2>
          <p className="text-gray-600">
            Showing results for:{" "}
            <span className="font-semibold">"{query}"</span>
          </p>
        </div>

        {query ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plantResults.map((plant) => (
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
                      {plant.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
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
