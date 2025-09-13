import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/Components/ui/toggle-group";
import { motion } from "framer-motion";

/* ---------- helpers ---------- */
const pad2 = (n) => String(n).padStart(2, "0");

// Format timestamp (ms) or Date -> "dd-mm-yyyy" (uses UTC so no timezone-shift)
const formatTimestampToDDMMYYYY = (val) => {
  if (val === null || val === undefined) return "";
  const num = typeof val === "number" ? val : Number(val);
  if (Number.isNaN(num)) return "";
  const d = new Date(num);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad2(d.getUTCDate())}-${pad2(d.getUTCMonth() + 1)}-${d.getUTCFullYear()}`;
};

// Extract an ISO datetime string from a variety of possible shapes:
// - { $date: "2025-09-06T..." }
// - { $date: { $numberLong: "..." } }
// - a plain ISO string "2025-09-06T..."
// - a number timestamp
// - a Date object
const extractISOFromClickedDate = (clickedDate) => {
  if (!clickedDate && clickedDate !== 0) return null;

  // If the whole property is an object like { $date: "..." }
  if (typeof clickedDate === "object") {
    // Common mongo export: { clickedDate: { $date: "2025-09-06T..." } }
    if ("$date" in clickedDate) {
      const v = clickedDate.$date;
      if (typeof v === "string") return v;
      if (typeof v === "number") return new Date(v).toISOString();
      if (typeof v === "object" && v && "$numberLong" in v) {
        const n = Number(v.$numberLong);
        if (!Number.isNaN(n)) return new Date(n).toISOString();
        return null;
      }
    }

    // Maybe it's actually a Date instance
    if (clickedDate instanceof Date) return clickedDate.toISOString();
    if (clickedDate.toISOString && typeof clickedDate.toISOString === "function") {
      try {
        return clickedDate.toISOString();
      } catch (e) {
        // fallthrough
      }
    }

    return null;
  }

  // If it's a string (ISO) or number timestamp
  if (typeof clickedDate === "string") return clickedDate;
  if (typeof clickedDate === "number") return new Date(clickedDate).toISOString();
  return null;
};

/* 
  Build series:
  - pageViews: array of docs
  - days: window size (e.g., 90)
  - fillMissing: if true, includes every calendar day with 0 where no data exists.
*/
const buildDailySeries = (pageViews = [], days = 90, fillMissing = false) => {
  // counts keyed by ISO date YYYY-MM-DD
  const counts = {};
  for (const view of pageViews || []) {
    const isoFull = extractISOFromClickedDate(view.clickedDate);
    if (!isoFull) continue;
    // isoFull should look like "2025-09-06T08:57:02.778Z" or similar
    const iso = isoFull.split("T")[0];
    counts[iso] = (counts[iso] || 0) + 1;
  }

  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // midnight UTC
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const series = [];

  if (fillMissing) {
    // create each day in the window (0 if missing)
    for (let d = new Date(start); d <= now; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = d.toISOString().split("T")[0];
      const [y, m, day] = iso.split("-").map(Number);
      const ts = Date.UTC(y, m - 1, day); // ms at UTC midnight
      series.push({ date: ts, visitors: counts[iso] || 0, iso });
    }
  } else {
    // only include days that actually have counts, and within the window
    Object.keys(counts).forEach((iso) => {
      const [y, m, day] = iso.split("-").map(Number);
      if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(day)) return;
      const ts = Date.UTC(y, m - 1, day);
      if (ts < start.getTime() || ts > now.getTime()) return; // outside window
      series.push({ date: ts, visitors: counts[iso], iso });
    });
    // sort ascending by date
    series.sort((a, b) => a.date - b.date);
  }

  return series;
};

/* ---------- Component ---------- */
export default function PageViewChart({ user, pageLoading }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  if (pageLoading || !user) return null;

  const days = timeRange === "90d" ? 90 : timeRange === "30d" ? 30 : 7;

  // set fillMissing to true if you want continuous day series with zeros.
 const chartData = React.useMemo(() => {
  if (!user?.pageViews) return [];
  return buildDailySeries(user.pageViews, days, false);
}, [user?.pageViews, days]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      
      <Card className="@container/card shadow-xl rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold tracking-tight">Total Visitors</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            <span className="hidden @[540px]/card:block">Total for the selected range</span>
            <span className="@[540px]/card:hidden">Visitors</span>
          </CardDescription>
          <CardAction className="flex gap-2">
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden @[767px]/card:flex rounded-lg border"
            >
              <ToggleGroupItem value="90d">3M</ToggleGroupItem>
              <ToggleGroupItem value="30d">30D</ToggleGroupItem>
              <ToggleGroupItem value="7d">7D</ToggleGroupItem>
            </ToggleGroup>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="flex w-36 @[767px]/card:hidden border rounded-lg" size="sm" aria-label="Select a value">
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
                <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
                <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>

        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={{ visitors: { label: "Visitors", color: "hsl(var(--chart-2))" } }} className="aspect-auto h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.10} />

                {/* X axis: numeric (timestamp ms), time scale */}
                <XAxis
                  dataKey="date"
                  type="number"
                  scale="time"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(ts) => formatTimestampToDDMMYYYY(ts)}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={12}
                />

                <YAxis tickLine={false} axisLine={false} width={40} />

               <ChartTooltip
  cursor={{ strokeDasharray: "6 3" }}
  content={({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const ts = label;
    const dateStr = formatTimestampToDDMMYYYY(ts);

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
        <div className="font-medium">{dateStr}</div>
        <div className="text-orange-600">
          Visitors: {payload[0].value}
        </div>
      </div>
    );
  }}
/>

                {/* linear to avoid spline overshoot; set dot:true to show actual points */}
                <Area
                  dataKey="visitors"
                  type="linear"
                  fill="url(#colorVisitors)"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
