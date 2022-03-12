const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;
}
// fetcher 함수 : json data의 promise를 return해야 한다.

export async function fetchCoinInfo(coinID: string) {
  const infoData = await (await fetch(`${BASE_URL}/coins/${coinID}`)).json();
  return infoData;
}

export async function fetchCoinTickers(coinID: string) {
  const priceData = await (await fetch(`${BASE_URL}/tickers/${coinID}`)).json();
  return priceData;
}

export function fetchCoinHistory(coinID: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinID}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
