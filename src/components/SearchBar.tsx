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

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex">
        <input
          className="w-full px-4 py-2 rounded-l-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white"
          type="text"
          placeholder="Search cloud term..."
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-md transition"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-b-md shadow-lg mt-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              onMouseDown={() => onSuggestionClick(s)}
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


