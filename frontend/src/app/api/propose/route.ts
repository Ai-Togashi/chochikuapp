import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // リクエストURLからクエリパラメータを取得
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId") || "301010010214";
    const dateFrom = searchParams.get("dateFrom") || "2025-03-01";
    const dateTo = searchParams.get("dateTo") || "2025-03-29";

    // Lambdaの提案APIに渡すURLを組み立てる
    const apiUrl = `https://3nt766j4d3.execute-api.ap-northeast-1.amazonaws.com/dev/propose?accountId=${accountId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    console.log("Fetching proposal from:", apiUrl);

    const res = await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) throw new Error("Failed to fetch proposal");

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching proposal:", error);
    return NextResponse.json({ error: "提案の取得に失敗しました: " + error.message }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await fetch("https://3nt766j4d3.execute-api.ap-northeast-1.amazonaws.com/dev/propose");
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error fetching proposal:", error);
//     return NextResponse.json({ error: "提案の取得に失敗しました" }, { status: 500 });
//   }
// }
