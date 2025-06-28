import React from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import TermCard from "./components/TermCard";

interface Term {
  term: string;
  description: string;
}

// ✅ Backend-powered fuzzy search endpoint (same as before)
const fetchDefinition = async (term: string): Promise<Term[]> => {
  try {
    const res = await fetch(
      `https://bekpbop916.execute-api.us-east-1.amazonaws.com/get-definition?term=${encodeURIComponent(term)}`
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    if (data.term && data.description) {
      return [data];
    }
    return [];
  } catch (error) {
    console.error("Error fetching definition:", error);
    return [];
  }
};

const App: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Term[]>([]);

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
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Header />
      <ThemeToggle />
      <main className="pt-10 px-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          suggestions={[]} // Suggestions removed since backend handles everything
          onSuggestionClick={handleSuggestionClick}
          onSearch={handleSearch}
        />
        <div className="flex flex-wrap justify-center mt-10">
          {results.length > 0 ? (
            results.map((t) => (
              <TermCard
                key={t.term}
                term={t.term}
                description={t.description}
              />
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
