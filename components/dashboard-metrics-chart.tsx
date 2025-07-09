"use client";
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardMetricsChart({
  chartData,
}: {
  chartData: any[];
}) {
  return (
    <ChartContainer
      config={{
        posts: { color: "#6366f1", label: "Posts" },
        projects: { color: "#10b981", label: "Projects" },
      }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={chartData}
          margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="posts"
            stroke="#6366f1"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="projects"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
