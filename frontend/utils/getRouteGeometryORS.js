// utils/getRouteGeometryORS.js
export const getRouteGeometryORS = async (startCoords, endCoords, apiKey) => {
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

  const body = {
    coordinates: [startCoords, endCoords],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch route');
  }

  const data = await response.json();
  return data.features[0].geometry.coordinates;
};
