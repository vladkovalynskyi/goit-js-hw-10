const API_KEY = 'live_K3pWxGPAiQFEJQ42hDV1K5hQeSWBKdnCioFta7dHuRIvGOeOj5hGbP70PmaQcOAv';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching breeds: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching cat by breed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}