"use client"
import { useState } from "react";

const sectionOptions = {
  education: ["Timeline", "Roadmap", "Grid", "MinimalList", "Accordion"],
  jobs: ["Timeline", "Cards", "Stacked", "DetailedList", "Compact"],
  bio: ["Minimal", "Card", "Centered", "Hero", "SplitLayout"],
  socials: ["IconGrid", "List", "Buttons", "Floating", "Sidebar"],
};

export default function DesignPicker() {
  const [selected, setSelected] = useState({
    education: "Timeline",
    jobs: "Cards",
    bio: "Minimal",
    socials: "IconGrid"
  });

  const handleChange = (section, value) => {
    setSelected((prev) => ({ ...prev, [section]: value }));
  };

  const handleSave = () => {
    console.log("Saving:", selected);
    // here you’d call your API -> save to Mongo
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">Design Picker</h1>
      
      {Object.entries(sectionOptions).map(([section, options]) => (
        <div key={section} className="p-4 border rounded-lg shadow-sm">
          <h2 className="capitalize font-semibold mb-2">{section}</h2>
          <select
            value={selected}
            onChange={(e) => handleChange(section, e.target.value)}
            className="border rounded px-3 py-2"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-500"
      >
        Save Design Choices
      </button>
    </div>
  );
}
