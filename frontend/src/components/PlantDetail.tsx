import { useParams, useNavigate } from "react-router-dom";
import { usePlantsFromGoogleSheet } from "@/lib/usePlantsFromGoogleSheet";

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { plants, loading } = usePlantsFromGoogleSheet();
  const plant = plants.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Loading...
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600 mb-4">Plant not found.</p>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto py-12 px-4 gap-10">
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
        <img
          src={plant.image}
          alt={plant.name}
          className="rounded-2xl shadow-xl w-full max-w-md object-cover"
        />
      </div>
      {/* Details */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h1 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-2">
          {plant.name}
        </h1>
        <h2 className="text-xl text-green-700 font-semibold mb-4 font-sans">
          {plant.scientific}
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-6 font-sans">
          {plant.moreInfo || plant.description || "No description available."}
        </p>
        <div className="bg-white/90 rounded-xl p-6 shadow border border-gray-100">
          <h3 className="font-bebas text-2xl text-gray-900 mb-2">
            Where to find it
          </h3>
          <p className="text-gray-600 font-sans">
            {plant.location || "No location info."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
