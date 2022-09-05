import axios from 'axios';

export const getNewsData = async () => {
  try {
    const response = await axios.get("https://cryptopanic.com/api/v1/posts/?auth_token=46cb829791f87a65ce32bdd3dd9a998e9ee1d416",{ data:null}, {
  headers: { 
    'Aceept': 'application/json',
    'Content-Type': 'application/json'
  }})
    const data = response.data;
    return data
  } catch (error) {
      console.log(error.message);
  }
}

export const getFilteredNewsData = async (curr) => {
  try {
    const response = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=46cb829791f87a65ce32bdd3dd9a998e9ee1d416&currencies=${curr}`)
    const data = response.data;
    return data
  } catch (error) {
      console.log(error.message);
  }
}
