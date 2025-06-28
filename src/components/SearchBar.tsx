import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  suggestions: string[];
  onSuggestionClick: (val: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  suggestions,
  onSuggestionClick,
  onSearch,
}) => {
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex">
        <input
          className="w-full px-4 py-2 rounded-l-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white"
          type="text"
          placeholder="Search cloud term..."
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value.trim() !== "") setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
              setShowSuggestions(false); // Hide suggestions on Enter
            }
          }}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-md transition"
          onClick={() => {
            onSearch();
            setShowSuggestions(false);
          }}
        >
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-b-md shadow-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
              onMouseDown={() => {
                onSuggestionClick(s);
                setShowSuggestions(false); // Hide dropdown after clicking
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
