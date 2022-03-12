// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 20px;
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  font-size: 24px;
  display: block;
`;

const CoinsList = styled.ul``;

const CoinElem = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};

  margin-bottom: 10px;
  border-radius: 15px;

  a {
    padding: 15px;
    transition: col or 0.2s ease-in-out;

    display: flex;
    align-items: center;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // react-query 사용 이후
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // react-query 사용 이전
  /* 
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); 
   */

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>loading ...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <CoinElem key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, symbol: coin.symbol }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </Link>
            </CoinElem>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
