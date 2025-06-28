// //残高を取得して表示するUI
"use client";

import { useEffect, useState } from "react";

export default function Balance() {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/balance")
      .then((res) => res.json())
      .then((data) => {
        console.log("取得したデータ:", data); // デバッグ用ログ

        if (data.parentBalance && data.parentBalance.balance) {
          setBalance(data.parentBalance.balance); // 文字列をそのまま保存
        } else {
          setBalance(null);
        }
      })
      .catch((err) => console.error("エラー:", err));
  }, []);

  return (
    <div className="p-4 rounded-lg bg-white">
      <h2 className="text-xl font-bold">現在の残高</h2>
      <p className="text-2xl text-blue-500 font-bold">
        {balance !== null ? balance : "読み込み中..."} {/* 文字列をそのまま表示 */}
      </p>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";

// export default function Balance() {
//   const [balance, setBalance] = useState<number | null>(null);

//   useEffect(() => {
//     fetch("/api/balance")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("取得したデータ:", data); // デバッグ用ログ

//         if (data.parentBalance && data.parentBalance.balance) {
//           // balance は文字列なので Number() で数値に変換
//           const b = Number(data.parentBalance.balance);
//           setBalance(b);
//         } else {
//           setBalance(null);
//         }
//       })
//       .catch((err) => console.error("エラー:", err));
//   }, []);

//   return (
//     <div className="p-4 rounded-lg bg-white">
//       <h2 className="text-xl font-bold">現在の残高</h2>
//       <p className="text-2xl text-blue-500 font-bold">
//         {balance !== null ? `${balance}円` : "読み込み中..."}
//       </p>
//     </div>
//   );
// }
