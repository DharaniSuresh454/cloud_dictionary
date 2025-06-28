import React from "react";
import ExplainMoreCard from "./ExplainMoreCard";

interface Props {
  term: string;
  description: string;
}

const TermCard: React.FC<Props> = ({ term, description }) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow w-full max-w-md text-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{term}</h3>
        <p className="text-slate-700 dark:text-slate-300">{description}</p>
      </div>
      <ExplainMoreCard term={term} />
    </div>
  );
};

export default TermCard;
