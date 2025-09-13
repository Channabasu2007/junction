import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const MessagesStats = ({ user }) => {
  const [range, setRange] = useState("total");
  const filters = ["week", "month", "year", "total"];

  // Helper function to calculate date
  const daysAgo = (num) => {
    const d = new Date();
    d.setDate(d.getDate() - num);
    return d;
  };

  // Filtered messages
  const filteredMessages = useMemo(() => {
    if (!user?.messages) return [];

    let fromDate;
    if (range === "week") fromDate = daysAgo(7);
    else if (range === "month") fromDate = daysAgo(30);
    else if (range === "year") fromDate = daysAgo(365);

    return user.messages.filter((msg) =>
      range === "total" ? true : new Date(msg.createdAt) >= fromDate
    );
  }, [user, range]);

  // Group by category
  const categoryStats = useMemo(() => {
    const stats = {};
    filteredMessages.forEach((msg) => {
      const cat = msg.category || "general";
      stats[cat] = (stats[cat] || 0) + 1;
    });
    return stats;
  }, [filteredMessages]);

  const totalMessages = filteredMessages.length;

  return (
    <Card className="w-full shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Messages Stats
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Overview of message statistics
        </CardDescription>
      </CardHeader>

      <CardContent>
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

        {/* Stats */}
        <div className="space-y-3">
          {Object.entries(categoryStats).map(([cat, count], i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b last:border-0 pb-2"
            >
              <Link
                href={`/ShowMessages?category=${cat}`}
                className="capitalize text-sm font-medium cursor-pointer"
              >
                {cat}
              </Link>
              <span className="text-sm text-muted-foreground">{count} msgs</span>
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center justify-between pt-3 font-semibold">
            <span>Total</span>
            <span>{totalMessages} msgs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesStats;
