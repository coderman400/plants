import { Link, useNavigate } from "react-router-dom";
import { usePlantsFromGoogleSheet } from "@/lib/usePlantsFromGoogleSheet";
import type { Plant } from "@/lib/usePlantsFromGoogleSheet";
import SearchBar from "./SearchBar";
import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Leaf } from "lucide-react";

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

const Navbar = () => {
  const navigate = useNavigate();
  const { plants } = usePlantsFromGoogleSheet();
  const keywords = useMemo(() => extractKeywords(plants), [plants]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSearch = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleSearchButton = () => {
    if (selectedTags.length > 0) {
      navigate(`/search?tags=${encodeURIComponent(selectedTags.join(","))}`);
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-green-200/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title */}
          <Link
            to="/"
            className="flex items-center gap-2 text-green-700 font-bold text-xl hover:text-green-800 transition-colors"
          >
            <Leaf className="w-6 h-6 text-green-700" />
          </Link>

          {/* Tagify SearchBar + Search Button */}
          <div className="flex-1 max-w-xl mx-4 flex items-center gap-2">
            <SearchBar whitelist={keywords} onChange={handleTagSearch} />
            <button
              onClick={handleSearchButton}
              className="ml-2 p-2 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>

          {/* User Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-green-200 transition-all duration-200">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-green-100 text-green-700">
                  U
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
