import React from "react";

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = React.useState(
    () => localStorage.getItem("theme") === "dark"
  );

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="absolute top-6 right-6 bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 rounded-full p-2 transition"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;


