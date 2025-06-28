// // // 収入取得を表示するAPI

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // クエリパラメータをLambdaのURLに追加
    const lambdaUrl = `https://hhtbtzgck9.execute-api.ap-northeast-1.amazonaws.com/dev/income?accountId=${accountId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    const res = await fetch(lambdaUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch income data: ${res.statusText}`);
    }

    const data = await res.json(); // JSON に変換

    return NextResponse.json(data); // フロントエンドに返す
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const lambdaUrl = "https://hhtbtzgck9.execute-api.ap-northeast-1.amazonaws.com/dev/income";

//     const res = await fetch(lambdaUrl, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch income data: ${res.statusText}`);
//     }

//     const data = await res.json(); // JSON に変換

//     return NextResponse.json(data); // フロントエンドに返す
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }