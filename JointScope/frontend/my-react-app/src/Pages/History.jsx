import Header from "../Components/Header";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { day: "Week 1", rom: 20 },
  { day: "Week 2", rom: 35 },
  { day: "Week 3", rom: 50 },
];

export default function History() {
  return (
    <div className="page">
      <Header />
      <h2>Recovery History</h2>

      <div className="chart-card">
        <LineChart width={320} height={220} data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rom" stroke="#1E3A8A" />
        </LineChart>
      </div>
    </div>
  );
}
