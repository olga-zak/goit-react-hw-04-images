import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30721713-dc13b7587189df7eaf911ae19';

export async function fetchImages(q, page) {
  return await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: q,
      image_type: 'photo',
      per_page: 12,
      page,
    },
  });
}
