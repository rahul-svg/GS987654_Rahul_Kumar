import React, { useState } from "react";
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

// Define the structure of the data
interface ChartData {
  store: string;
  week: string;
  gmDollars: number;
  gmPercent: number;
}

// Mock Data
const mockData: ChartData[] = [
  { store: "Store A", week: "Week 1", gmDollars: 5000, gmPercent: 30 },
  { store: "Store A", week: "Week 2", gmDollars: 7000, gmPercent: 35 },
  { store: "Store B", week: "Week 1", gmDollars: 4000, gmPercent: 25 },
  { store: "Store B", week: "Week 2", gmDollars: 6000, gmPercent: 40 },
];

// Extract unique store names
const stores: string[] = Array.from(new Set(mockData.map((d) => d.store)));

const ChartPage: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<string>(stores[0]);

  // Filter data based on the selected store
  const filteredData = mockData.filter((d) => d.store === selectedStore);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <h2 style={{ textAlign: "center" }}>Weekly GM Dollars & GM %</h2>

      {/* Store Selection Dropdown */}
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <label>Select Store: </label>
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: "GM %", angle: -90, position: "insideRight" }} />
          <Tooltip />
          <Legend />

          {/* GM Dollars as Bar Chart */}
          <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />

          {/* GM % as Line Chart */}
          <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff7300" name="GM %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPage;
