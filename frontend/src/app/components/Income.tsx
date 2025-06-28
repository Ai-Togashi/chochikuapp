// // // 収入取得を表示するUI

"use client";

import { useEffect, useState } from "react";

export default function Income() {
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIncome() {
      try {
        const accountId = "301010010214"; // 指定する口座ID
        const dateFrom = "2025-03-24"; // 取得開始日
        const dateTo = "2025-03-25"; // 取得終了日

        const queryParams = new URLSearchParams({
          accountId,
          dateFrom,
          dateTo,
        }).toString(); // クエリパラメータを文字列化

        const res = await fetch(`/api/income?${queryParams}`); // クエリを付与してAPIリクエスト
        if (!res.ok) throw new Error("Failed to fetch income data");

        const data = await res.json();
        setTotalIncome(data.totalIncome); // totalIncome をセット
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchIncome();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 rounded-lg bg-white">
      <h2 className="text-xl font-semibold">総収入</h2>
      <p className="text-2xl font-bold text-green-600">
        {totalIncome ? `¥${totalIncome.toLocaleString()}` : "¥0"}
      </p>
    </div>
  );
}