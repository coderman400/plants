import { useEffect, useRef } from "react";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

interface SearchBarProps {
  whitelist: string[];
  onChange: (tags: string[]) => void;
}

const SearchBar = ({ whitelist, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagifyRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      tagifyRef.current = new Tagify(inputRef.current, {
        whitelist,
        dropdown: {
          enabled: 1,
          fuzzySearch: true,
          position: "all",
        },
        enforceWhitelist: false,
      });

      tagifyRef.current.on("change", () => {
        const tags = tagifyRef.current.value.map((t: any) => t.value);
        onChange(tags);
      });
    }
    return () => {
      tagifyRef.current && tagifyRef.current.destroy();
    };
  }, [whitelist, onChange]);

  return (
    <input
      ref={inputRef}
      placeholder="Search..."
      className="tagify-input w-full px-3 py-2 border rounded focus:outline-none"
      style={{ width: "100%" }}
    />
  );
};

export default SearchBar;
