import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 親口座の残高を取得するLambdaエンドポイントを呼ぶ
    const res = await fetch("https://tfsia0d6wh.execute-api.ap-northeast-1.amazonaws.com/dev/balance/parent");

    if (!res.ok) {
      throw new Error("API request failed");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching parent balance:", error);
    return NextResponse.json({ error: "Failed to fetch parent balance" }, { status: 500 });
  }
}
