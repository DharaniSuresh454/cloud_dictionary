import React from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import TermCard from "./components/TermCard";

interface Term {
  term: string;
  description: string;
}

// ✅ Fetch full definition
const fetchDefinition = async (term: string): Promise<Term[]> => {
  try {
    const res = await fetch(
      `https://bekpbop916.execute-api.us-east-1.amazonaws.com/get-definition?term=${encodeURIComponent(term)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.term && data.description) return [data];
    return [];
  } catch (error) {
    console.error("Error fetching definition:", error);
    return [];
  }
};

// ✅ Fetch backend fuzzy suggestions
const fetchSuggestions = async (term: string): Promise<string[]> => {
  try {
    const res = await fetch(
      `https://a5esmzuhf5.execute-api.us-east-1.amazonaws.com/suggest-terms?term=${encodeURIComponent(term)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.suggestions || [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

const App: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Term[]>([]);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  // 🔁 Update suggestions as user types
  React.useEffect(() => {
    const getSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      const data = await fetchSuggestions(query.trim());
      setSuggestions(data);
    };

    getSuggestions();
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const results = await fetchDefinition(query.trim());
    setResults(results);
  };

  const handleSuggestionClick = async (val: string) => {
    setQuery(val);
    const result = await fetchDefinition(val);
    setResults(result);
    setSuggestions([]); // Clear dropdown after click
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Header />
      <ThemeToggle />
      <main className="pt-10 px-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          suggestions={suggestions} // ✅ Enable dropdown
          onSuggestionClick={handleSuggestionClick}
          onSearch={handleSearch}
        />
        <div className="flex flex-wrap justify-center mt-10">
          {results.length > 0 ? (
            results.map((t) => (
              <TermCard key={t.term} term={t.term} description={t.description} />
            ))
          ) : (
            <div className="text-slate-500 dark:text-slate-300 mt-10">
              No results found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
