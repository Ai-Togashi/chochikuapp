import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://gjicigum48.execute-api.ap-northeast-1.amazonaws.com/dev/acounts');
    if (!res.ok) throw new Error('Failed to fetch accounts');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
