import React from "react";

interface TermCardProps {
  term: string;
  description: string;
}

const TermCard: React.FC<TermCardProps> = ({ term, description }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 m-4 max-w-md transition hover:scale-105 hover:shadow-lg">
    <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{term}</h2>
    <p className="text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

export default TermCard;
