exports.handler = async (event, context) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json'
    };
  
    // Manejar OPTIONS request para CORS
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }
  
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }
  
      const data = await response.json();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
      
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Error fetching products',
          message: error.message 
        })
      };
    }
  };