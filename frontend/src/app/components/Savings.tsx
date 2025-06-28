// // // // // 貯蓄額の提案・振替UI

"use client";

import { useState } from "react";

export default function Savings() {
  const [proposal, setProposal] = useState<string>("");
  const [proposalAmount, setProposalAmount] = useState<number | null>(null);
  const [transferResult, setTransferResult] = useState<string>("");
  const [debitBalance, setDebitBalance] = useState<number | null>(null);
  const [depositBalance, setDepositBalance] = useState<number | null>(null);
  const [loadingProposal, setLoadingProposal] = useState<boolean>(false);
  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);

  const accountId = "301010010214";
  const dateFrom = "2025-03-24";
  const dateTo = "2025-03-25";

  // 貯蓄提案を取得する関数
  const fetchProposal = async () => {
    setLoadingProposal(true);
    try {
      const res = await fetch(
        `/api/propose?accountId=${accountId}&dateFrom=${dateFrom}&dateTo=${dateTo}`
      );
      if (!res.ok) {
        throw new Error("提案の取得に失敗しました");
      }
      const data = await res.json();
      setProposal(data.message);
      setProposalAmount(data.proposalAmount);
      setTransferResult("");
      setDebitBalance(null);
      setDepositBalance(null);
    } catch (err) {
      console.error("エラー:", err);
      setProposal("提案の取得に失敗しました");
    } finally {
      setLoadingProposal(false);
    }
  };

  // 振替を実行する関数
  const handleTransfer = async () => {
    if (proposalAmount === null) {
      setTransferResult("振替金額が取得されていません");
      return;
    }

    setLoadingTransfer(true);
    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentAmount: proposalAmount }),
      });
      const data = await res.json();
      if (res.ok) {
        setTransferResult(data.message);
        setDebitBalance(Number(data.balances.debitBalance));
        setDepositBalance(Number(data.balances.depositBalance));
      } else {
        setTransferResult("振替に失敗しました: " + data.error);
      }
    } catch (err) {
      console.error("エラー:", err);
      setTransferResult("振替の実行に失敗しました");
    } finally {
      setLoadingTransfer(false);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white">
      <button
        onClick={fetchProposal}
        disabled={loadingProposal}
        className="bg-blue-400 text-white p-2 rounded mt-2 w-full cursor-pointer active:scale-95 transition"
      >
        {loadingProposal ? "🔄 提案中..." : "貯蓄提案を受けてみる"}
      </button>

      {proposal && (
        <div className="mt-2">
          <p>{proposal}</p>
          <button
            onClick={handleTransfer}
            disabled={loadingTransfer}
            className="bg-green-300 text-white p-2 rounded mt-2 w-full cursor-pointer active:scale-95 transition"
          >
            {loadingTransfer ? "🔄 振替中..." : "💰 振替を実行する"}
          </button>
        </div>
      )}

      {transferResult && <p className="mt-2 text-blue-500">{transferResult}</p>}

      {debitBalance !== null && depositBalance !== null && (
        <div className="mt-2 p-2 rounded bg-gray-100">
          <p>振替後の残高</p>
          <p className="text-red-500">振替元の残高: {debitBalance.toLocaleString()} 円</p>
          <p className="text-green-500">振替先の残高: {depositBalance.toLocaleString()} 円</p>
        </div>
      )}
    </div>
  );
}


// "use client";

// import { useState } from "react";

// export default function Savings() {
//   // state定義
//   const [proposal, setProposal] = useState<string>("");
//   const [proposalAmount, setProposalAmount] = useState<number | null>(null);
//   const [transferResult, setTransferResult] = useState<string>("");
//   const [debitBalance, setDebitBalance] = useState<number | null>(null);
//   const [depositBalance, setDepositBalance] = useState<number | null>(null);

//   // 取得したい期間・口座IDを設定
//   const accountId = "301010010214";
//   const dateFrom = "2025-03-24";
//   const dateTo = "2025-03-25";

//   // 貯蓄提案を取得する関数
//   const fetchProposal = async () => {
//     try {
//       // テンプレートリテラルでURLを組み立てる
//       const res = await fetch(
//         `/api/propose?accountId=${accountId}&dateFrom=${dateFrom}&dateTo=${dateTo}`
//       );
//       if (!res.ok) {
//         throw new Error("提案の取得に失敗しました");
//       }
//       const data = await res.json();
//       console.log("取得した提案データ:", data); // ← ここでレスポンス内容をログ出力

//       setProposal(data.message);
//       setProposalAmount(data.proposalAmount);
//       setTransferResult("");
//       setDebitBalance(null);
//       setDepositBalance(null);
//     } catch (err: any) {
//       console.error("エラー:", err);
//       setProposal("提案の取得に失敗しました");
//     }
//   };

//   // 振替を実行する関数（そのまま）
//   const handleTransfer = async () => {
//     try {
//       if (proposalAmount === null) {
//         setTransferResult("振替金額が取得されていません");
//         return;
//       }
//       const res = await fetch("/api/transfer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ paymentAmount: proposalAmount })
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setTransferResult(data.message);
//         setDebitBalance(Number(data.balances.debitBalance));
//         setDepositBalance(Number(data.balances.depositBalance));
//       } else {
//         setTransferResult("振替に失敗しました: " + data.error);
//       }
//     } catch (err) {
//       console.error("エラー:", err);
//       setTransferResult("振替の実行に失敗しました");
//     }
//   };

//   return (
//     <div className="p-4 rounded-lg bg-white">
//       <button
//         onClick={fetchProposal}
//         className="bg-blue-400 text-white p-2 rounded mt-2 w-full"
//       >
//         貯蓄提案を受けてみる
//       </button>
//       {proposal && (
//         <div className="mt-2">
//           <p>{proposal}</p>
//           <button
//             onClick={handleTransfer}
//             className="bg-green-300 text-white p-2 rounded mt-2 w-full"
//           >
//             振替を実行する
//           </button>
//         </div>
//       )}
//       {transferResult && <p className="mt-2 text-blue-500">{transferResult}</p>}
//       {debitBalance !== null && depositBalance !== null && (
//         <div className="mt-2 p-2 rounded bg-gray-100">
//           <p>振替後の残高</p>
//           <p className="text-red-500">振替元の残高: {debitBalance} 円</p>
//           <p className="text-green-500">振替先の残高: {depositBalance} 円</p>
//         </div>
//       )}
//     </div>
//   );
// }


// // "use client";

// // import { useState } from "react";

// // export default function Savings() {
// //   const [proposal, setProposal] = useState<string>("");
// //   const [proposalAmount, setProposalAmount] = useState<number | null>(null);
// //   const [transferResult, setTransferResult] = useState<string>("");
// //   const [debitBalance, setDebitBalance] = useState<number | null>(null);
// //   const [depositBalance, setDepositBalance] = useState<number | null>(null);

// //   // 貯蓄提案を取得する関数
// //   const fetchProposal = async () => {
// //     try {
// //       const res = await fetch("/api/propose");
// //       const data = await res.json();
// //       setProposal(data.message);
// //       setProposalAmount(data.proposalAmount);
// //       setTransferResult("");
// //       setDebitBalance(null);
// //       setDepositBalance(null);
// //     } catch (err) {
// //       console.error("エラー:", err);
// //       setProposal("提案の取得に失敗しました");
// //     }
// //   };

// //   // 振替を実行する関数
// //   const handleTransfer = async () => {
// //     try {
// //       if (proposalAmount === null) {
// //         setTransferResult("振替金額が取得されていません");
// //         return;
// //       }

// //       const res = await fetch("/api/transfer", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ paymentAmount: proposalAmount })
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         setTransferResult(data.message);
// //         setDebitBalance(Number(data.balances.debitBalance));
// //         setDepositBalance(Number(data.balances.depositBalance));
// //       } else {
// //         setTransferResult("振替に失敗しました: " + data.error);
// //       }
// //     } catch (err) {
// //       console.error("エラー:", err);
// //       setTransferResult("振替の実行に失敗しました");
// //     }
// //   };

// //   return (
// //     <div className="p-4 rounded-lg bg-white">
// //       <button
// //         onClick={fetchProposal}
// //         className="bg-blue-400 text-white p-2 rounded mt-2 w-full"
// //       >
// //         貯蓄提案を受けてみる
// //       </button>
// //       {proposal && (
// //         <div className="mt-2">
// //           <p>{proposal}</p>
// //           <button
// //             onClick={handleTransfer}
// //             className="bg-green-400 text-white p-2 rounded mt-2 w-full"
// //           >
// //             振替を実行する
// //           </button>
// //         </div>
// //       )}
// //       {transferResult && <p className="mt-2 text-blue-500">{transferResult}</p>}
// //       {debitBalance !== null && depositBalance !== null && (
// //         <div className="mt-2 p-2 rounded bg-gray-100">
// //           <p>振替後の残高:</p>
// //           <p className="text-red-500">振替元の残高: {debitBalance} 円</p>
// //           <p className="text-green-500">振替先の残高: {depositBalance} 円</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
