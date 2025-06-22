import { useCallback, useEffect, useMemo, useState } from 'react';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import AddLinksComponent from '../../components/UI/AddLinksComponent/AddLinksComponent';
import useCardsController from './hooks/useCardsController';
import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../constants/MainButton';
import { mainButtonController } from './controllers/MainButtonController';
import { backButtonController } from './controllers/BackButtonController';
import BackButton from '../../constants/BackButton';
import { makeCardFormData } from './utils/makeCardFormData';
import { USERID } from '../../constants/tgStatic.config';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import { useNavigate, useParams } from 'react-router';
import { setUser } from '../../store/information';
import { postCard } from '../../store/telegramUserInfo/thunks/postCard';
import { putCard } from '../../store/telegramUserInfo/thunks/putCard';


const NewChangeCard = ({isNewCard}) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        title : false,
        description : false,
        photos : false,
        links : {
            isError : false,
            id : 0
        }
    })
    
    const [changedCard, setChangedCard] = useState(null);

    const navigate = useNavigate();

    const {id} = useParams();

    const userCards = useSelector( (state) => state.telegramUserInfo.profile.cards );

    const me = useSelector( (state) => state.telegramUserInfo )
    const baidgeCard = useMemo(() => userCards.find((card) => String(card.id) === id) ?? {}, [userCards, id])


    useEffect( () => {
        if (isNewCard){
            setChangedCard( {
                id : null,
                title : "",
                description : "",
                photos : [],
                photosNames : [],
                links : []
            })
        }
        else{
            setChangedCard(baidgeCard)
        }
    } , [isNewCard, baidgeCard, id, userCards]) 
    
    const save = useCallback( async ( ) => {
        alert("Вызов save");
        if (isNewCard){
            const myFormData = makeCardFormData({card : changedCard, isCardNew : true} )
            await dispatch(postCard([myFormData, USERID, changedCard]));
            dispatch(setUser(me));
        }
        else{
            const myFormData = makeCardFormData({card : changedCard, isCardNew : false} )
            await dispatch(putCard([myFormData, changedCard.id, changedCard]));
            dispatch(setUser(me));
        }
        navigate(-1);
    } , [changedCard, dispatch, isNewCard, navigate, me] )

    const backFunction = useCallback( () => {
        backButtonController.backFunction({changedCard, errors, card : baidgeCard,  isNewCard, navigate, save});
    } , [changedCard, errors, save, navigate , baidgeCard, isNewCard ] )

    useEffect( () => {
        BackButton.onClick(backFunction)
        return () => {
            BackButton.offClick(backFunction);
        }
    } , [backFunction] )


    useEffect( () => {
        const localErrors = {
            title : false,
            description : false,
            photos : false,
            links : {
                isError : false,
                ids : [0]
            }
        }
        if (changedCard?.description.length < 3 || changedCard?.description.length > 500 ){
            localErrors.description = true
        }
        if (changedCard?.title.length < 3 || changedCard?.title.length > 25){
            localErrors.title = true
        }
        if (!changedCard?.photos.length){
            localErrors.photos = true
        }
        if ( changedCard?.links?.filter((link) => link.length).length  ){
            const errorsIds = [];
            changedCard.links.forEach( (link, id) => {
                if (!link.includes('http')){
                    errorsIds.push(id);
                }
            } )
            if (errorsIds.length){
                localErrors.links = { isError : true, ids:errorsIds }
            }
        }
        setErrors(localErrors);

    } , [changedCard, setErrors] )

    const {changeCardDescription, changeCardTitle, changePhotos} = useCardsController({setChangedCard})

    const forwardFunction = useCallback( async () => {
        mainButtonController.forwardFunction({errors, save});
    } , [errors, save] )

    useEffect( () => {
        MainButton.onClick(forwardFunction);
        return () => {
            MainButton.offClick(forwardFunction)
        }
    } , [forwardFunction] )

    useEffect( () => {
        mainButtonController.visabilityController({card : baidgeCard, changedCard, errors});
    } , [errors, changedCard, baidgeCard] )  // Чекаем на ерорсы

    const setLinks = useCallback((updater) => {
        setChangedCard((prev) => ({
          ...prev,
          links: typeof updater === 'function' ? updater(prev.links) : updater,
        }));
      }, [setChangedCard]);

    const leftSymbols = 25 - changedCard?.title?.length < 0 ? 0 : 25 - changedCard?.title?.length;

    if (!changedCard){
        return <MyLoader />
    }
    return (
        <div className="pt-[20px] left-0 top-0 px-[16px] bg-[#18222d] flex flex-col pb-[16px]">
             <div className='fixed left-1/2 top-1/2' onClick={forwardFunction}>MAIN</div>
            <button onClick={forwardFunction}>ГО</button>
            <h2 className='ml-4 text-[20.72px] font-semibold font-sf-pro-display-600 text-white'>{isNewCard ? "Создание кейса" : "Изменение кейса"}</h2>
            <div className='py-3 mt-[18px] px-4 flex bg-card rounded-t-[11.7px] items-center border-b-[1px] border-[0px] border-solid border-[#2A343F]'>
                <input value={changedCard.title} onChange={changeCardTitle} className='font-normal w-full text-[16.67px] font-sf-pro-display-400 text-white leading-[18.3px] placeholder:text-[#90979F]' placeholder='Название' type="text" />
                <p className={`ml-auto text-[13px] !text-[#95979e] font-sf-pro-display-400 font-normal leading-[14.34px] ${leftSymbols === 0 ? "text-red-500" : "text-[#DAF5FE]"}`}>{leftSymbols}</p>
            </div>
            <DescriptionAndPhoto textAreaClassName={"!min-h-[73px]"} descriptionClassName={"!rounded-t-none !min-h-[100px]"} setText={changeCardDescription} text={changedCard.description} textPlaceholder={"Описание"} isFileInput = {false} />
            <p className='ml-4 mt-[5px] font-sf-pro-display-400 text-[13.33px] font-normal leading-[15.643px] text-[#DAF5FE]'>Название и описание для кейса.</p>
            <DescriptionAndPhoto  className={"!mt-[10px]"} photos={changedCard.photos} setPhotos={changePhotos} isDescription = {false} />
            <AddLinksComponent links={changedCard.links} setLinks={setLinks}  />
        </div>
    );
};

export default NewChangeCard;