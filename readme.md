# Crypto App

This is a cryptocurrency application which serves the purpose of displaying important information regarding crypto coins. This application is catered to those who observe market data and invest in cryptocurrency. The features included in this app are as follows:
- Market data – real-time current prices
- 7-day prices chart for a given coin
- Personalized information – the users will have the ability to select favorites
- Latest News on cryptocurrency and the ability to filter the news based on a chosen coin
- Latest Tweets for a selected coin
- Top trending coins
- Dark mode and light mode feature

## Run Locally

Unzip the folder code provided and open the terminal

- Go to the project directory

```bash
  cd crypto-app
```

- Install dependencies

```bash
  npm install
```

- Start the server

```bash
  expo start
```
You can scan the QR code printed in the terminal or use one of the simulators installed in your computer to run in iOS or Android.

## Running Tests

To run tests, run the following command

```bash
  npm test
```

## API Reference

### Coingecko

#### Get market data

Returns a list of coins with market prices and market chart data

```http
  GET /api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d
```

| Parameter | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `vs_currency` | `string` | Currency type: usd |
| `order` | `string` | market_cap_desc |
| `per_page` | `string` | 100 |
| `page` | `string` | 1 |
| `sparkline` | `string` | true |
| `price_change_percentage` | `string` | 7d |

#### Get coin

Returns data for a single coin

```http
  GET /api/v3/coins/${currid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currid`  | `string` | **Required**. Id of item to fetch |

#### Get trending coins

returns a list of all 24-hour trendinc coins

```http
  GET /api/v3/search/trending
```

### Cryptopanic

#### Get News data

Returns news data for all coins

```http
  GET /api/v1/posts/?auth_token=${token}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth_token` | `string` | **Required**. API key |

#### Get filtered news data

Returns news data for given coin

```http
  GET /api/v1/posts/?auth_token=${token}&currencies=${curr}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth_token` | `string` | **Required**. API key |
| `currencies` | `string` | **Required**. coin symbol |

### Coinpaprika

#### Get tweets

Returns all tweets for a given coin

```http
  GET /v1/coins/${result}/twitter
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `result` | `string` | **Required**. coin id - coin name |

## Demo

https://youtu.be/i-zkKl8m7IM