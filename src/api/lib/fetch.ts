export async function getData(url: string) {
  try {
    const request_url = `https://api.olympiapaint.com/api/${url}`;
    const response = await fetch(request_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Check if the response status is OK (200-299)
    if (!response.ok) {
      return null;
    }

    // Parse the JSON response and return the data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
