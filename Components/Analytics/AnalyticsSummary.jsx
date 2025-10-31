import React, { useState, useMemo } from "react";

const AnalyticsSummary = ({ user }) => {
  const [range, setRange] = useState("total");

  const daysAgo = (num) => {
    const d = new Date();
    d.setDate(d.getDate() - num);
    return d;
  };

  const filters = ["week", "month", "year", "total"];

  // Memoize all derived stats to avoid unnecessary calculations
  const { pageViewStats, messageStats, linkOpenStats, stats } = useMemo(() => {
    if (!user) return { pageViewStats: {}, messageStats: {}, linkOpenStats: {}, stats: { pageViews: 0, linksClicked: 0, messages: 0 } };

    const pageViews = user.pageViews || [];
    const messages = user.messages || [];
    const allClicks = user.sites?.flatMap(site => site.clickHistory) || [];

    const pageViewStats = {
      week: pageViews.filter(v => new Date(v.clickedDate) >= daysAgo(7)),
      month: pageViews.filter(v => new Date(v.clickedDate) >= daysAgo(30)),
      year: pageViews.filter(v => new Date(v.clickedDate) >= daysAgo(365)),
      total: pageViews
    };

    const messageStats = {
      week: messages.filter(m => new Date(m.createdAt) >= daysAgo(7)),
      month: messages.filter(m => new Date(m.createdAt) >= daysAgo(30)),
      year: messages.filter(m => new Date(m.createdAt) >= daysAgo(365)),
      total: messages
    };

    const linkOpenStats = {
      week: allClicks.filter(c => new Date(c.clickedAt) >= daysAgo(7)),
      month: allClicks.filter(c => new Date(c.clickedAt) >= daysAgo(30)),
      year: allClicks.filter(c => new Date(c.clickedAt) >= daysAgo(365)),
      total: allClicks
    };

    const stats = {
      pageViews: pageViewStats[range]?.length || 0,
      linksClicked: linkOpenStats[range]?.length || 0,
      messages: messageStats[range]?.length || 0
    };

    return { pageViewStats, messageStats, linkOpenStats, stats };
  }, [user, range]);

  return (
    <section className="w-full space-y-6">
      {/* Filter Toggle */}
      <div className="flex items-center justify-center md:justify-end gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setRange(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all 
              ${range === f
                ? "bg-orange-500 text-white shadow"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Total Page Views</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pageViews}</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Total Links Clicked</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.linksClicked}</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Total Messages</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.messages}</p>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSummary;
