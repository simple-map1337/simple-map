// api/places.js
export default async function handler(request, response) {
  // Разрешаем CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Обрабатываем OPTIONS запрос (для CORS)
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  const { query } = request.query;
  
  if (!query) {
    return response.status(400).json({ error: 'Query parameter is required' });
  }
  
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}+Україна&language=uk&key=${apiKey}`;
    
    const placesResponse = await fetch(url);
    const data = await placesResponse.json();
    
    response.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}
