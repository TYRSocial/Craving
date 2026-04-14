import { connectToDatabase } from '@/lib/mongodb';
import Shop from '@/models/Shop';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = parseFloat(searchParams.get('latitude'));
    const longitude = parseFloat(searchParams.get('longitude'));
    const maxDistance = parseFloat(searchParams.get('maxDistance')) || 5000; // 5km default
    const craving = searchParams.get('craving');

    if (!latitude || !longitude) {
      return Response.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude], // GeoJSON order: [longitude, latitude]
          },
          $maxDistance: maxDistance,
        },
      },
    };

    // Filter by craving category if provided
    if (craving) {
      query['foodItems.cravingCategory'] = craving;
    }

    const nearbyShops = await Shop.find(query)
      .limit(20)
      .populate('ownerId', 'name email');

    // Sort by distance (mock distance calculation)
    const shopsWithDistance = nearbyShops.map((shop) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        shop.location.coordinates[1],
        shop.location.coordinates[0]
      );
      return {
        ...shop.toObject(),
        distance,
      };
    });

    shopsWithDistance.sort((a, b) => a.distance - b.distance);

    return Response.json({ shops: shopsWithDistance });
  } catch (error) {
    console.error('Error fetching nearby shops:', error);
    return Response.json(
      { error: 'Failed to fetch nearby shops' },
      { status: 500 }
    );
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}
