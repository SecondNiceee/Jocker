import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessions } from "../../store/profession";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import BaidgeCreaitingOne from "./BaidgeCreaitingOne";
import BaidgeCreatingTwo from "./BaidgeCreatingTwo";
import { useNavigate } from "react-router";
import { baidgeButtonController } from "./hooks/BaidgeButton.conroller";
import MainButton from "../../constants/MainButton";
import BackButton from "../../constants/BackButton";
import menuController from "../../functions/menuController";
import { fetchUserInfo } from "../../store/telegramUserInfo/thunks/fetchUserInfo";
import { putUserInfo } from "../../store/telegramUserInfo/thunks/putUserInfo";
import { fetchMyAdditionalUserInfo } from "../../store/telegramUserInfo/thunks/fetchAdditionalUserInfo";
import { useAddPageHistory } from "../../hooks/useAddPageHistory";
import DevelopmentMainButton from "../../components/UI/DevelopmentMainButton/DevelopmentMainButton";
import { setBaidgeCreating } from "../../store/baidgeCreating";

const BaidgeCreating = ({isChanging = false}) => {

  const dispatch = useDispatch();

  useAddPageHistory();

  const categorys = useSelector((state) => state.categorys.category);

  const professions = useSelector((state) => state.profession.professions);

  const isProfessionsLoaded = useRef(false);

  useEffect(() => {
    if (!isProfessionsLoaded.current){
      if (!professions || !professions?.length){
        dispatch(getProfessions());
      }
      isProfessionsLoaded.current = true;
    }
  }, [dispatch, professions]);


  const me = useSelector( (state) => state.telegramUserInfo )

  const {description, taggs, links, stage, categoryInformation, isFilled} = useSelector( (state) => state.baidgeCreatingSlice )

  const [step, setStep] = useState(0);

  const navigate = useNavigate();
  useEffect( () => {
    if (!isFilled && professions?.length && categorys?.length && me?.id){
      let newBaidgeCreatingSlice = {
          categoryInformation : {
              category : null,
              profession : null
          },
          stage : null,
          links : null,
          taggs : null,
          taggsText : null,
          description : null
      }
        newBaidgeCreatingSlice.description = me.profile.about ?? "";
        newBaidgeCreatingSlice.taggs = me.taggs ?? [];
        newBaidgeCreatingSlice.taggsText = me?.taggs ? me.taggs.join(', ') : ""
        newBaidgeCreatingSlice.links = me.links ?? [''];
        newBaidgeCreatingSlice.stage = me.stage;
        if (me.profession){
          newBaidgeCreatingSlice.categoryInformation = {
            category : categorys[0],
            profession : me.profession
          }
        }
        else{
          newBaidgeCreatingSlice.categoryInformation = {
            category : categorys[0],
            profession : professions.find((profession) => profession.category.id === categorys[0].id)
          }
        }
      dispatch(setBaidgeCreating({...newBaidgeCreatingSlice, isFilled : true}));
    }
    // if (!categoryInformation){
    //   if (me)
    // }
  }, [me, dispatch, professions, categorys, isFilled] )

  const [errors, setErrors] = useState({
    descriptionError: false,
    taggsError: false});

  useEffect(() => {
    baidgeButtonController.controlText({ step, me, isChanging });
  }, [step, me, isChanging]);

  useEffect(() => {
    const notEmptyTaggs = taggs?.filter( (tag) => tag.length !== 0 )
    const lErrors = {
      descriptionError: false,
      taggsError: false,
    };

    if (description?.length > 500 || description?.length < 5) {
      lErrors.descriptionError = true;
    }
    if (notEmptyTaggs?.length > 5 || notEmptyTaggs?.length === 0){
        lErrors.taggsError = true
    }
    setErrors(lErrors);
  }, [description, links, taggs]);

  useEffect(() => {
    baidgeButtonController.controlVisability({ errors, step });
  }, [errors, step]);

  const postBaidge = useCallback( async () => {
        await dispatch(putUserInfo([{
            links : links.filter( (tag) => tag.length ),
            taggs : taggs.filter( (tag) => tag.length ),
            profession : categoryInformation.profession.id,
            stage : typeof stage === "string" ? Number(stage.split(' ')[0]) : stage, 
            about : description
        }])  );
        await dispatch(fetchUserInfo())
        await dispatch(fetchMyAdditionalUserInfo({isCommonRating : true, isRatingByProfession : true}));
        navigate("/Baidge")
  }, [dispatch, categoryInformation?.profession?.id, description, links, navigate, stage, taggs] )

  const goFoward = useCallback( () => {
      baidgeButtonController.forwardFunction({
        setStep,
        step,
        description,
        dispatch,
        links,
        professionId : categoryInformation?.profession?.id,
        taggs,
        postBaidge
    });
  }, [setStep, step, description, dispatch, links, categoryInformation?.profession?.id, taggs, postBaidge ] ) ;

  const goBack = useCallback( () => {
    baidgeButtonController.backFunction({
          navigate,
          step,
          setStep,
        });
  }, [navigate, step, setStep] )

  useEffect(() => {
    MainButton.onClick(goFoward);
    BackButton.onClick(goBack);
    return () => {
      MainButton.offClick(goFoward);
      BackButton.offClick(goBack);
    };
  }, [step, navigate, setStep, goFoward, goBack, description, links, taggs, dispatch, categoryInformation?.profession?.id]);

  useEffect(() => {
    MainButton.show();
    BackButton.show();
    return () => {
      MainButton.hide();
      BackButton.hide();
    };
  }, []);

  useEffect(() => {
    menuController.hideMenu();
  }, []);

  if (categorys.length === 0 || professions.length === 0) {
    return <MyLoader />;
  }
  return (
    <div
      className={`flex min-w-[100vw] transition-transform duration-300 ${
        step === 0 ? "translate-x-0" : "-translate-x-[100vw]"
      }`}
    >
      <DevelopmentMainButton goForward={goFoward} className={"!fixed !left-[100vw]"} />
      <DevelopmentMainButton goForward={goFoward} className={"!fixed !left-[0vw]"} />
      <BaidgeCreaitingOne/>
      <BaidgeCreatingTwo/>
    </div>
  );
};

export default BaidgeCreating;
