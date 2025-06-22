import { useEffect, useState } from "react";

export const useTon = ( ) => {


    const [tonConstant, setTonConstant] = useState(0);
    const [dollarValue, setDollarValue] = useState(0);

    async function getCurrencies() {
      const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const data = await response.json();
      const result = await data;
      return result.Valute.USD.Value;
    }

    async function getTonPrice() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/the-open-network"
      );
      const data = await response.json();
      return data.market_data.current_price.usd;
    }
    function getDollarByRuble() {
      getCurrencies().then((dollarPrice) => {
        setDollarValue(dollarPrice);
      });
      return null;
    }

    function getTonByRuble() {
      getTonPrice().then((tonPrice) => {
        setTonConstant(dollarValue * tonPrice);
      });
      return null;
    }

    useEffect(() => {
      getDollarByRuble();
      getTonByRuble();
    }, [tonConstant, dollarValue]);


    return tonConstant
}