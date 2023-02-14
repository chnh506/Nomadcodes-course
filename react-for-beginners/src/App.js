import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const getCoins = async () => {
    const res = await fetch("https://api.coinpaprika.com/v1/tickers");
    const json = await res.json();
    console.log(json);
    setCoins(json);
    setLoading(false);
  };
  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div>
      <h1>Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
