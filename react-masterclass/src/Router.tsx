import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinID" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
