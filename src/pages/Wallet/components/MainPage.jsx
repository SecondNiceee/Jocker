import React, { memo, useCallback, useEffect, useState } from 'react';
import cl from "../index.module.scss"
import Buttons from './Buttons';
import { Address, fromNano } from 'ton-core';
import { TonClient } from 'ton';
import { useSelector } from 'react-redux';
const MainPage = ({setDepositShow}) => {


    const address = useSelector( state => state.telegramUserInfo.address )


    const [balance, setBalance] = useState(0)
    

    const getBalance = useCallback(async () => {

      const client = new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
      });

      console.log(address);

      const balance = await client.getBalance(Address.parse(address))

      console.log(fromNano(balance));
      


    }, [address]);
  
    useEffect( () => {
      if (address){
        getBalance()
      }
    }, [address] )

    return (
        <div className={cl.wrapper}>

        <div className={cl.top}>
          <p>Кошелек</p>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.47315 8.24096C9.47315 7.88592 9.18534 7.5981 8.83029 7.5981C8.47525 7.5981 8.18744 7.88592 8.18744 8.24096H9.47315ZM8.18744 11.6113C8.18744 11.9664 8.47525 12.2542 8.83029 12.2542C9.18534 12.2542 9.47315 11.9664 9.47315 11.6113H8.18744ZM8.70067 5.51874V4.87588C8.34563 4.87588 8.05781 5.1637 8.05781 5.51874H8.70067ZM8.70067 5.77799H8.05781C8.05781 6.13303 8.34563 6.42085 8.70067 6.42085V5.77799ZM8.95992 5.77799V6.42085C9.31496 6.42085 9.60278 6.13303 9.60278 5.77799H8.95992ZM8.95992 5.51874H9.60278C9.60278 5.1637 9.31496 4.87588 8.95992 4.87588V5.51874ZM15.5763 8.50022C15.5763 12.2259 12.556 15.2462 8.83029 15.2462V16.532C13.2661 16.532 16.862 12.936 16.862 8.50022H15.5763ZM8.83029 15.2462C5.10456 15.2462 2.08426 12.2259 2.08426 8.50022H0.798549C0.798549 12.936 4.39448 16.532 8.83029 16.532V15.2462ZM2.08426 8.50022C2.08426 4.77449 5.10456 1.75419 8.83029 1.75419V0.468471C4.39448 0.468471 0.798549 4.06441 0.798549 8.50022H2.08426ZM8.83029 1.75419C12.556 1.75419 15.5763 4.77449 15.5763 8.50022H16.862C16.862 4.06441 13.2661 0.468471 8.83029 0.468471V1.75419ZM8.18744 8.24096V11.6113H9.47315V8.24096H8.18744ZM8.05781 5.51874V5.77799H9.34352V5.51874H8.05781ZM8.70067 6.42085H8.95992V5.13514H8.70067V6.42085ZM9.60278 5.77799V5.51874H8.31707V5.77799H9.60278ZM8.95992 4.87588H8.70067V6.16159H8.95992V4.87588Z"
              fill="#DAF5FE"
            />
          </svg>
        </div>
        {/* <p className={cl.priceText}>
          <span>≈T</span>{balance}
        </p> */}
        <p className={cl.priceText}>
        {balance}<span> TON</span>
        </p>
          <Buttons setDepositShow = {setDepositShow} />

      </div>
    );
};

export default memo(MainPage);