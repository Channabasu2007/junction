import React from "react";

const AnalyticsHeader = ({ user }) => {
    return (
      <div className="flex items-center justify-between py-4 px-4 md:px-6 
                bg-white dark:bg-neutral-900 
                rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800">
            <h1
                className="text-2xl md:text-3xl font-bold text-orange-500 bg-clip-text tracking-tight"
            >
                Analytics
            </h1>

            <div className="flex items-center gap-2">
                {/* Example: Subtitle or Date */}
                <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-400 italic">
                    Dashboard Overview
                </span>
            </div>
        </div>
    );
};

export default AnalyticsHeader;
