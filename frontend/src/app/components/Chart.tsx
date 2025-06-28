// Todoグラフ表示見た目修正要
"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FFBB28"]; // 親:青, 子:黄

export default function Chart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chart")
      .then((res) => res.json())
      .then((chartData) => {
        setData([
          { name: "親口座", value: chartData.parentBalance },
          { name: "投資用", value: chartData.childBalance },
        ]);
        setTotal(chartData.totalBalance);
        setLoading(false);
      })
      .catch((err) => {
        console.error("チャートデータ取得失敗:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">全口座の残高割合</h2>
      <p>総残高:￥{total?.toLocaleString()}</p>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={75}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <ul className="mt-4">
        {data.map((entry, index) => (
          <li key={index} className="text-lg">
            {entry.name}: ￥{entry.value.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
