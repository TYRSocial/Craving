import { FOOD_RECOMMENDATIONS, MOCK_RESTAURANTS } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foodItems = FOOD_RECOMMENDATIONS[id] || [];
    const restaurants = MOCK_RESTAURANTS;

    return NextResponse.json({
      foodItems,
      restaurants,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
