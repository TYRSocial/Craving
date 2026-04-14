import { CRAVINGS, FOOD_RECOMMENDATIONS, MOCK_RESTAURANTS } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    return NextResponse.json({ cravings: CRAVINGS });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
