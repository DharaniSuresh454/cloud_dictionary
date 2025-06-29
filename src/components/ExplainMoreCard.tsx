import React, { useState } from "react";

interface Props {
  term: string;
}

const ExplainMoreCard: React.FC<Props> = ({ term }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://phkzdea3b3.execute-api.us-east-1.amazonaws.com/prod/askai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term }),
      });
      const data = await res.json();
      console.log("Full API response:", data);
      setAnswer(data.explanation ?? data.error ?? "AI couldn't explain further.");

    } catch (error) {
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded shadow p-6 mt-4 w-full md:w-[500px] mx-auto text-center">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
        Want to know more about this term?
      </h3>
      <button
        onClick={handleAskAI}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "🤖 Ask AI"}
      </button>
      {answer && (
        <p className="mt-4 text-slate-600 dark:text-slate-300">{answer}</p>
      )}
    </div>
  );
};

export default ExplainMoreCard;
