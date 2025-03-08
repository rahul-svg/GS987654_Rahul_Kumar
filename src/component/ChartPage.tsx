import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import { weeklyData } from "../types/Types";
import chartData from "../mockData/chartData.json"; // Ensure correct import

// Ensure chartData is typed correctly
const data: weeklyData[] = chartData as weeklyData[];

const ChartPage: React.FC = () => {
  return (
    <div className="chartsView flex justify-center items-center h-screen bg-black">
      <div className="chart-container w-full max-w-4xl p-4 rounded-lg shadow-lg" style={{ backgroundColor: "#000" }}>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="week" stroke="#fff" />
            <YAxis yAxisId="left" stroke="#fff" label={{ value: "Dollars ($)", angle: -90, position: "insideLeft", fill: "#fff" }} />
            <YAxis yAxisId="right" orientation="right" stroke="#fff" label={{ value: "GM %", angle: -90, position: "insideRight", fill: "#fff" }} />
            <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#fff" }} />

            {/* Bars for GM Dollars & Sales Dollars */}
            <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />
            <Bar yAxisId="left" dataKey="salesDollars" fill="#82ca9d" name="Sales Dollars" />

            {/* Line for GM % */}
            <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff7300" name="GM %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPage;
