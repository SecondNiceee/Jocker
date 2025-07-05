import { useCallback, useEffect, useMemo, useState } from 'react';
import useBlockInputs from '../../../hooks/useBlockInputs';
import MainButton from '../../../constants/MainButton';
import { disableColorAndActiveButton } from '../../../functions/disableColorAndActiveButton';
import { enableColorAndActiveButton } from '../../../functions/enableColorAndActiveButton';
import { softVibration } from '../../../functions/softVibration';
import menuController from '../../../functions/menuController';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryInformation } from '../../../store/baidgeCreating';
import { useNavigate } from 'react-router';
import useNavigateBack from '../../../hooks/useNavigateBack';
import DevelopmentMainButton from '../../../components/UI/DevelopmentMainButton/DevelopmentMainButton';

const BaidgeProfessionChoicer = () => {

    const professions = useSelector( state => state.profession.professions);

    const navigate = useNavigate();
    
    const categorysInformation = useSelector( (state) => state.baidgeCreatingSlice.categoryInformation )

    const dispatch = useDispatch();

    const sortedProfessions = useMemo( () => {
      return professions.filter( (prof) => prof.category.id === categorysInformation.category.id );
    }, [professions, categorysInformation] )

    const setCategoryInformationToStore = useCallback( (categoryInf) => {
      dispatch(setCategoryInformation(categoryInf));
    }, [dispatch] )
  
    useBlockInputs();
  
    const [choisenProfession, setChoisenProfession] = useState(categorysInformation.profession);
  
    const buttonHandler = useCallback( () => {
        setCategoryInformationToStore({ ...categorysInformation , profession : choisenProfession });
        navigate(-1);
    } , [setCategoryInformationToStore, choisenProfession, categorysInformation, navigate] );

    useEffect( () => {
      MainButton.show();
    }, [] )
    
    useEffect( () => {
    MainButton.onClick(buttonHandler)
      if (!choisenProfession){
        disableColorAndActiveButton()
      }
      else{
        enableColorAndActiveButton()
      }
      MainButton.setText("Готово")
      return () => {
        MainButton.setText("ДАЛЕЕ")
        MainButton.offClick(buttonHandler)
      }
    } , [choisenProfession, setCategoryInformationToStore, setChoisenProfession, professions, categorysInformation, buttonHandler]  );

    useNavigateBack({isSliderOpened : false, setSlideOpened : () => {}, isWorks : true});
  
    const categoryClickHandler = (profession) => () => {
      if (profession.id === choisenProfession?.id){
        setChoisenProfession(false)
      }
      else{
        setChoisenProfession(profession);
      }
      softVibration();
    }
  
    useEffect( () => {
      menuController.hideMenu();
      return () => {
        menuController.showMenu();
      }
    } )

    return (
      <div className="bg-[#18222d] flex flex-col px-[16px] pt-[17px] z-[400] pb-[20px]" >
        <DevelopmentMainButton goForward={buttonHandler} />
        <p className="mt-[13px] ml-[17px] font-sf-pro-display-400 font-extralight text-[13px] tracking-[0.02em] text-[#84898f] uppercase mb-[9px]">Профессии</p>
  
          <div className="flex rounded-[10px] bg-[#21303f] flex-col pl-[16px] pr-[16px]">
              {sortedProfessions.map((profession, id) => {
                return (
                  <div onClick={categoryClickHandler(profession)} className="grid cursor-pointer pt-[13px] grid-cols-[min-content_auto] gap-y-[10px] gap-x-[11px] w-full">
                    <div className={`rounded-full border-solid border-[1px] w-[21px] h-[21px] self-center flex justify-center items-center ${choisenProfession?.id === profession.id ? "bg-[#2EA6FF] border-[#2EA6FF] " : "border-[#384656]"}`}>
                        <svg className={`${choisenProfession?.id === profession.id ? "" : "hidden"}`} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.19553 10.5012C3.89935 10.5012 3.64759 10.3745 3.44027 10.1209L0.563626 6.60418C0.482176 6.50864 0.42294 6.41493 0.385918 6.32306C0.352598 6.23119 0.335938 6.13565 0.335938 6.03643C0.335938 5.81595 0.409982 5.63405 0.558072 5.49073C0.706162 5.34742 0.893125 5.27576 1.11896 5.27576C1.37442 5.27576 1.58915 5.38417 1.76315 5.60098L4.17331 8.63263L8.87702 1.23539C8.97327 1.0884 9.07323 0.985509 9.1769 0.926714C9.28056 0.864243 9.41014 0.833008 9.56563 0.833008C9.79147 0.833008 9.97658 0.902828 10.121 1.04247C10.2654 1.18211 10.3376 1.36033 10.3376 1.57714C10.3376 1.66534 10.3227 1.75353 10.2931 1.84172C10.2635 1.92992 10.2172 2.02178 10.1543 2.11733L4.95634 10.0989C4.77863 10.3671 4.52503 10.5012 4.19553 10.5012Z" fill="white" stroke="white" stroke-width="0.333387" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <h3  className="font-light tracking-[-3.6%]  text-[17px] text-white font-sf-pro-text-400 leading-[17px]">{profession.profession}</h3>
                    </div>
                    <div className={`h-[0.5px] col-start-2 col-end-3 w-[100%] bg-[#384656]  ${id + 1 === sortedProfessions.length ? "opacity-0" : ""}`}></div>
                </div>
                )
              })}
          </div>
        </div>
      );
  };

export default BaidgeProfessionChoicer;