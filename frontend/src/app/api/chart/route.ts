import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 2つのAPIを並行して取得
    const [parentRes, childRes] = await Promise.all([
      fetch("https://tfsia0d6wh.execute-api.ap-northeast-1.amazonaws.com/dev/balance/parent"),
      fetch("https://978yree68f.execute-api.ap-northeast-1.amazonaws.com/dev/balance/childe"),
    ]);

    // JSONに変換
    const [parentData, childData] = await Promise.all([
      parentRes.json(),
      childRes.json(),
    ]);

    console.log("取得した親口座データ:", parentData);
    console.log("取得した子口座データ:", childData);

    // 残高情報を取得
    const parentBalance = parentData.parentBalance.balance
      ? Number(parentData.parentBalance.balance.replace(/[￥,]/g, "")) // ￥と, を除去
      : 0;

    const childBalance = childData.balance
      ? Number(childData.balance.replace(/[￥,]/g, "")) // ￥と, を除去
      : 0;

    console.log("変換後の親残高:", parentBalance);
    console.log("変換後の子残高:", childBalance);

    // 合計残高
    const totalBalance = parentBalance + childBalance;

    return NextResponse.json({
      parentBalance,
      childBalance,
      totalBalance,
    });
  } catch (error) {
    console.error("残高取得エラー:", error);
    return NextResponse.json({ error: "データ取得に失敗しました" }, { status: 500 });
  }
}