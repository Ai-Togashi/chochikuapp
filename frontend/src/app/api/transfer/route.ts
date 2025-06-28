import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 外部の振替Lambda関数のエンドポイントURL
    const res = await fetch("https://oerciuclp5.execute-api.ap-northeast-1.amazonaws.com/dev/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await request.text(), // フロントエンドからのリクエストボディをそのまま転送
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Transfer error:", error);
    return NextResponse.json({ error: "振替の実行に失敗しました" }, { status: 500 });
  }
}
