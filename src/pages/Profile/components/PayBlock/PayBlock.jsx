import { memo, useEffect } from "react";
import cl from "./PayBlock.module.scss";
import CreateButton from "../CreateButton/CreateButton";
import PayTextContainer from "../PayTextContainer/PayTextContainer";
import { useDispatch, useSelector } from "react-redux";
import translation from "../../../../functions/translate";
import useTonConnection from "../../../../hooks/useTonConnection";
import WalletBackPack from "./WalletBackPack";
import { putUserInfo } from "../../../../store/telegramUserInfo/thunks/putUserInfo";
import formateMoney from "../../../../functions/formateMoney";
const PayBlock = ({ className = {} }) => {
  
  const address = useSelector((state) => state.telegramUserInfo.address);

  const dispatch = useDispatch()

  const balance = useSelector((state) => state.balance.value)

  const {formatAdress, handleWalletAction, tonWalletAddress} = useTonConnection()

  useEffect( () => { // Если tonWalletAddress !== null и также он не равен адресу , который у юзера, то ставим этот адресс сюда
      if (tonWalletAddress !== address && tonWalletAddress){
        dispatch(putUserInfo([{
          address : tonWalletAddress}]))
      }
  }, [tonWalletAddress, address, dispatch] )

  return (
    <>
    {
      address ?
      <div className="rounded-[13px] bg-[#21303F] w-[100%] py-[10px] px-[19px] flex justify-between items-center">
        <div className="flex gap-[10px] items-center">
          
          <div className="rounded-full w-[40px] h-[40px] bg-[#2EA5FF] flex justify-center items-center">
            <WalletBackPack />
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="font-sf-pro-display mt-[3px] tracking-[.015em] text-[17px] leading-[18px] text-[white] font-normal">
              Connect Wallet
            </p>
            <p className="font-sf-pro-display tracking-[.015em] leading-normal text-[14px] text-[#daf5ff] font-normal">
              {formatAdress(address)}
            </p>
          </div>
        </div>

        <p className="font-sf-compact-rounded leading-normal text-white font-normal text-[18px]">
            {formateMoney(String(balance), 3, ".")}p
        </p>

      </div>
      :
      <div
      className={className ? [cl.container, className].join(" ") : className}
    >
      <CreateButton onClick={handleWalletAction} className={cl.createButton}>
        <p>{translation("Кошелек")}</p>
        <WalletBackPack />
        <svg
                className={cl.animation}
                width="236"
                height="52"
                viewBox="0 0 236 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_f_2312_10096)">
                  <ellipse
                    cx="108.832"
                    cy="26"
                    rx="66.5"
                    ry="124"
                    fill="#52DEFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_2312_10096"
                    x="-18.2546"
                    y="-158.587"
                    width="254.173"
                    height="369.173"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix"  />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="30.2933"
                      result="effect1_foregroundBlur_2312_10096"
                    />
                  </filter>
                </defs>
              </svg>
      </CreateButton>
      <PayTextContainer style = {!address ? {} : {display : "none"}} />
    </div>
    }
    </>
  );
};

export default memo(PayBlock);
