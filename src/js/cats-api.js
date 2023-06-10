const API_KEY = 'live_K3pWxGPAiQFEJQ42hDV1K5hQeSWBKdnCioFta7dHuRIvGOeOj5hGbP70PmaQcOAv';

export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';
  
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error fetching breeds:', error);
        throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}