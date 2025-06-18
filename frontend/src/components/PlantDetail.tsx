import { useParams, useNavigate } from "react-router-dom";

const plantData = {
  1: {
    name: "Monstera Deliciosa",
    scientific: "Lidah Mertua",
    image: "/plants/monstera.jpg",
    description:
      "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a tropical plant famous for its large, perforated leaves. It's a favorite among plant lovers for its dramatic foliage and easy care.",
    where:
      "Native to Central America, commonly found in rainforests and as a popular houseplant worldwide.",
  },
  2: {
    name: "Ficus Lyrata",
    scientific: "Fiddle Leaf Fig",
    image: "/plants/ficus.jpg",
    description:
      "The Fiddle Leaf Fig is known for its large, violin-shaped leaves and upright growth. It makes a bold statement in any room and thrives in bright, indirect light.",
    where:
      "Native to western Africa, often found in tropical rainforests and as a decorative indoor plant.",
  },
  3: {
    name: "Begonia Rex",
    scientific: "Begonia",
    image: "/plants/begonia.jpg",
    description:
      "Begonia Rex is prized for its stunning, colorful foliage. The leaves come in a variety of patterns and colors, making it a standout in any plant collection.",
    where:
      "Native to tropical and subtropical regions, especially India and Southeast Asia.",
  },
};

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plantData[Number(id) as keyof typeof plantData];

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
          {plant.description}
        </p>
        <div className="bg-white/90 rounded-xl p-6 shadow border border-gray-100">
          <h3 className="font-bebas text-2xl text-gray-900 mb-2">
            Where to find it
          </h3>
          <p className="text-gray-600 font-sans">{plant.where}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
