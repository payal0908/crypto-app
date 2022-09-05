import axios from 'axios';

export const getTweetsData = async (curr) => {
  try {

    var id = curr.id.toLowerCase()
    var coin = curr.item.toLowerCase()
    let result = id.concat('-',coin);
    const response = await axios.get(`https://api.coinpaprika.com/v1/coins/${result}/twitter` , { data:null}, {
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
