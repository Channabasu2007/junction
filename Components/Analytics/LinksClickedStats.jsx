import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

const LinksClickedStats = ({ user }) => {
  const [range, setRange] = useState("total");
  const filters = ["week", "month", "year", "total"];

  // Helper to calculate date ranges
  const daysAgo = (num) => {
    const d = new Date();
    d.setDate(d.getDate() - num);
    return d;
  };

  // Filtering clicks based on selected range
  const filteredClicks = useMemo(() => {
    if (!user?.sites) return [];

    let fromDate;
    if (range === "week") fromDate = daysAgo(7);
    else if (range === "month") fromDate = daysAgo(30);
    else if (range === "year") fromDate = daysAgo(365);

    return user.sites.map((site) => {
      const clicks = site.clickHistory.filter((c) =>
        range === "total" ? true : new Date(c.clickedAt) >= fromDate
      );
      return {
        name: site.name,
        url: site.url,
        count: clicks.length,
      };
    });
  }, [user, range]);

  return (
    <Card className="@container/card shadow-xl rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Links Clicked
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Total links clicked stats
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-2">
        {/* Filter Buttons */}
        <div className="flex items-center justify-center md:justify-end gap-2 flex-wrap mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setRange(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all 
                ${
                  range === f
                    ? "bg-orange-500 text-white shadow"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats List */}
        <div className="grid gap-3">
          {filteredClicks.map((site, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b last:border-0 py-2"
            >
              <span className="font-medium text-sm">{site.name}</span>
              <span className="text-sm text-muted-foreground">
                {site.count} clicks
              </span>
            </div>
          ))}

          {/* Show total at bottom */}
          <div className="flex items-center justify-between pt-3 font-semibold">
            <span>Total</span>
            <span>
              {filteredClicks.reduce((sum, s) => sum + s.count, 0)} clicks
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinksClickedStats;
