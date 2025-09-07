"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/Components/ui/toggle-group"

export function PageViewsChart({ user }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  // Prepare pageViews data
  const rawData = user?.pageViews || []
  const formattedData = rawData.map((view) => ({
    date: view.clickedDate,
    count: 1,
  }))

  // Group by date (aggregate counts)
  const aggregatedData = Object.values(
    formattedData.reduce((acc, cur) => {
      const day = new Date(cur.date).toISOString().split("T")[0]
      if (!acc[day]) acc[day] = { date: day, count: 0 }
      acc[day].count += cur.count
      return acc
    }, {})
  )

  // Filter based on time range
  const referenceDate = new Date()
  let daysToSubtract = 90
  if (timeRange === "30d") daysToSubtract = 30
  else if (timeRange === "7d") daysToSubtract = 7

  const startDate = new Date(referenceDate)
  startDate.setDate(startDate.getDate() - daysToSubtract)

  const filteredData = aggregatedData.filter(
    (item) => new Date(item.date) >= startDate
  )

  const chartConfig = {
    count: {
      label: "Page Views",
      color: "orange",
    },
  } 

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Page Views</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {timeRange === "7d"
              ? "Last 7 days"
              : timeRange === "30d"
              ? "Last 30 days"
              : "Last 3 months"}
          </span>
          <span className="@[540px]/card:hidden">Overview</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                <stop offset="95%" stopColor="orange" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: timeRange === "7d" ? "short" : "short",
                  day: timeRange === "7d" ? "numeric" : undefined,
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#fillOrange)"
              stroke="orange"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
