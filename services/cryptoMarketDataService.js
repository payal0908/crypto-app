import axios from 'axios';
import moment from 'moment';

const formatSparkline = (values) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  let formattedSparkline = values.map((item, index) => {
    return {
      x: sevenDaysAgo+(index+1) * 3600,
      y: item,
    }
  })
  return formattedSparkline;
}

const formatMarketData = (data) => {
  let formatted = [];

  data.forEach(val => {
      const sparkline = formatSparkline(val.sparkline_in_7d.price)
      const item = {
        ...val,
        sparkline_in_7d: {
          price: sparkline
        }
      }
      formatted.push(item);
  });
  return formatted;
}

export const getMarketData = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d")
    const data = response.data;
    const formatted = formatMarketData(data);
    return formatted;
  } catch (error) {
      console.log(error.message);
  }
}

export const getCoinData = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d")
    const data = response.data;
    return data;
  } catch (error) {
      console.log(error.message);
  }
}

export const coinInfo = async (currid) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${currid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
      const data = response.data;
      return data;
  }catch (error) {
      console.log(error.message);
  }
}

export const getTrendingCoins = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/search/trending`)
      const data = response.data;
      return data;
  }catch (error) {
      console.log(error.message);
  }
}
