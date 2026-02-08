import Logo from "../components/Logo";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const mockData = [
  { session: "1", rom: 20 },
  { session: "2", rom: 35 },
  { session: "3", rom: 50 },
  { session: "4", rom: 65 }
];

export default function History() {
  return (
    <div className="page logo-page">
      <Logo size={100} />

      <div className="chart-card">
        <h3>Recovery Progress</h3>

        <LineChart width={320} height={220} data={mockData}>
          <XAxis dataKey="session" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rom"
            stroke="#0B2D4A"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </div>
  );
}
