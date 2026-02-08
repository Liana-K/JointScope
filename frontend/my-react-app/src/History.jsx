import React from "react";
import "./history.css";
import logo from "./logo.png";

export default function History() {
  return (
    <div>

      {/*main content */}
      <main className="history-container">
        <h1>Recovery Progress</h1>

        {/* graph */}
        <div className="graph-container">
          <svg viewBox="0 0 500 300" className="line-graph">
            {/* Y-axis */}
            <line x1="60" y1="20" x2="60" y2="260" className="axis" />

            {/* X-axis */}
            <line x1="60" y1="260" x2="470" y2="260" className="axis" />

            {/* Y-axis labels */}
            <text x="25" y="260" className="label">0°</text>
            <text x="25" y="220" className="label">10°</text>
            <text x="25" y="180" className="label">20°</text>
            <text x="25" y="140" className="label">30°</text>
            <text x="25" y="100" className="label">40°</text>
            <text x="25" y="60" className="label">50°</text>
            <text x="25" y="30" className="label">60°</text>

            {/* X-axis labels */}
            <text x="140" y="285" className="label">Week 1</text>
            <text x="260" y="285" className="label">Week 2</text>
            <text x="380" y="285" className="label">Week 3</text>

            {/* animated line */}
            <polyline
              points="140,210 260,150 380,90"
              className="progress-line"
            />
          </svg>
        </div>

        {/* data table stuff*/}
        <table className="data-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Max Angle (°)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Week 1</td>
              <td>18°</td>
            </tr>
            <tr>
              <td>Week 2</td>
              <td>42°</td>
            </tr>
            <tr>
              <td>Week 3</td>
              <td>65°</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
