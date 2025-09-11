import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Shadcn UI component stubs to make the file self-contained
const Card = ({ className, ...props }) => <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props} />;
const CardHeader = ({ className, ...props }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />;
const CardContent = ({ className, ...props }) => <div className={`p-6 pt-0 ${className}`} {...props} />;
const CardTitle = ({ className, ...props }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />;

// New ChartTooltip and ChartTooltipContent stubs
const ChartTooltip = ({ children, ...props }) => <div className={`rounded-lg bg-white p-2 text-sm shadow-md ${props.className}`} {...props}>{children}</div>;
const ChartTooltipContent = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div className="rounded-md border bg-white p-2 text-sm shadow-md">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <div className="font-medium">{entry.name}: {entry.value}</div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Define colors for the pie chart slices
const COLORS = ['#f97316', '#fb923c'];

export default function VisitorDiversionPercentage({ user }) {
  const pageViews = user?.pageViews?.length + 1 || 0;
  const allClicks = user?.sites?.flatMap(site => site.clickHistory) || [];
  const totalClicks = allClicks.length;
  const data = [
    { name: 'Views', value: pageViews },
    { name: 'Clicks', value: totalClicks },
  ];

  return (
  
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Card className="shadow-xl rounded-2xl w-[90vw] max-w-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Visitors Diversion
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pt-2 sm:px-6 sm:pt-4">
            <ResponsiveContainer width="90%" height={275}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  labelLine={false}
                >
                  {
                    data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4 space-x-4">
              {data.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span>{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

  );
}
