import React from "react";
import Fuse from "fuse.js"; // ✅ Import Fuse
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import TermCard from "./components/TermCard";

interface Term {
  term: string;
  description: string;
}

// ✅ Replace with your real API Gateway invoke URL
const fetchDefinition = async (term: string): Promise<Term[]> => {
  try {
    const res = await fetch(
      `https://bekpbop916.execute-api.us-east-1.amazonaws.com/get-definition?term=${term}`
    );
    if (!res.ok) {
      console.error("Failed to fetch");
      return [];
    }
    const data = await res.json();
    return [data]; // Wrap in array for consistency with map()
  } catch (error) {
    console.error("Error fetching definition:", error);
    return [];
  }
};

// ✅ Optional: local dataset for fuzzy search
const localTerms: Term[] = [
  { term: "IAM", description: "Identity and Access Management in AWS." },
  { term: "Lambda", description: "Run code without provisioning servers." },
  { term: "S3", description: "Object storage for the cloud." },
  { term: "CloudFront", description: "CDN to deliver content with low latency." },
  { term: "EC2", description: "Virtual server in the cloud." },
  // Add more if needed
];

const App: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Term[]>([]);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  // ✅ Fuse config for fuzzy matching
  const fuse = new Fuse(localTerms, {
    keys: ["term"],
    threshold: 0.4, // Lower is stricter
  });

  // ✅ Update suggestions based on local fuzzy results
  React.useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const fuzzyResults = fuse.search(query);
    const topSuggestions = fuzzyResults.map((result) => result.item.term);
    setSuggestions(topSuggestions);
  }, [query]);

  const handleSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }
    const result = await fetchDefinition(query);
    setResults(result);
  };

  const handleSuggestionClick = async (val: string) => {
    setQuery(val);
    const result = await fetchDefinition(val);
    setResults(result);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Header />
      <ThemeToggle />
      <main className="pt-10 px-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          suggestions={suggestions}
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
