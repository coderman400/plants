import { useEffect, useRef } from "react";

interface SearchBarProps {
  whitelist: string[];
  onChange: (tags: string[]) => void;
}

const SearchBar = ({ whitelist, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagifyRef = useRef<any>(null);

  useEffect(() => {
    let Tagify: any;
    let tagifyInstance: any;

    if (typeof window !== "undefined" && inputRef.current) {
      import("@yaireo/tagify").then((module) => {
        Tagify = module.default;
        tagifyInstance = new Tagify(inputRef.current!, {
          whitelist,
          dropdown: {
            enabled: 1,
            fuzzySearch: true,
            position: "all",
          },
          enforceWhitelist: false,
        });

        tagifyInstance.on("change", () => {
          const tags = tagifyInstance.value.map((t: any) => t.value);
          onChange(tags);
        });

        tagifyRef.current = tagifyInstance;
      });
    }

    return () => {
      if (tagifyRef.current) tagifyRef.current.destroy();
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
