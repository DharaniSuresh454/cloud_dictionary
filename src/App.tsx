import React from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import TermCard from "./components/TermCard";

interface Term {
  term: string;
  description: string;
}

// Sample cloud terms data
const termsData: Term[] = [
  {
    term: "AWS KMS",
    description: "AWS Key Management Service (KMS) allows you to create and control the encryption keys used to encrypt your data."
  },
  {
    term: "Azure Blob Storage",
    description: "Azure Blob Storage is Microsoft's object storage solution for the cloud."
  },
  {
    term: "Google Cloud Pub/Sub",
    description: "A messaging service for exchanging event data among applications and services."
  },
  {
    term: "IAM",
    description: "Identity and Access Management (IAM) enables you to manage access to cloud resources securely."
  },
  {
    term: "Docker",
    description: "A platform for developing, shipping, and running applications in containers."
  },
  {
    term: "Kubernetes",
    description: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications."
  },
  {
    term: "Serverless",
    description: "A cloud computing execution model where the cloud provider automatically manages the allocation and provisioning of servers."
  },
  {
    term: "Microservices",
    description: "An architectural style that structures an application as a collection of loosely coupled services."
  },
  {
    term: "Load Balancer",
    description: "A device that distributes network or application traffic across a number of servers."
  },
  {
    term: "CDN",
    description: "Content Delivery Network - a geographically distributed network of proxy servers and their data centers."
  }
];

const App: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Term[]>(termsData);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!query) {
      setResults(termsData);
      setSuggestions([]);
      return;
    }
    const filtered = termsData.filter((t) =>
      t.term.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.map((t) => t.term));
  }, [query]);

  const handleSearch = () => {
    if (!query) {
      setResults(termsData);
      return;
    }
    setResults(
      termsData.filter((t) =>
        t.term.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (val: string) => {
    setQuery(val);
    setResults(termsData.filter((t) => t.term === val));
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
