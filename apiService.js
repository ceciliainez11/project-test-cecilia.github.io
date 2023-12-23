export const fetchDataFromApi = async () => {
    const apiUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
    const params = {
      "page[number]": 1,
      "page[size]": 10,
      append: ['small_image', 'medium_image'],
      sort: 'published_at'
    };
  
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  
    const fullUrl = `${apiUrl}?${queryString}`;
  
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  