import { NextResponse } from 'next/server';
import CryptoService from '@/service/crypto';

export async function GET(req: Request) {
  try {
    const instances = CryptoService.getInstance();
    const { searchParams } = new URL(req.url);
    const start = Number(searchParams.get('start')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const data = await instances.getList({ start, limit });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
