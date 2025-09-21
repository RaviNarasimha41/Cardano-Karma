"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", karma: 2400 },
  { day: "Tue", karma: 2500 },
  { day: "Wed", karma: 2600 },
  { day: "Thu", karma: 2700 },
  { day: "Fri", karma: 2750 },
  { day: "Sat", karma: 2800 },
  { day: "Sun", karma: 2847 },
]

export function KarmaChart() {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="karma"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
