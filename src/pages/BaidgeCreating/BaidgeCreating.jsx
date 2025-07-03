import { useEffect, useState } from "react";
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

const BaidgeCreating = ({isChanging = false}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessions());
  }, [dispatch]);

  useAddPageHistory();

  const categorys = useSelector((state) => state.categorys.category);

  const professions = useSelector((state) => state.profession.professions);

  const me = useSelector( (state) => state.telegramUserInfo )
  const [description, setDescription] = useState(me?.profile?.about ?? "");

  const taskInformation = {
    category: categorys[0],
    subCategory: { subCategory: "Привет" },
  };

  const [taggsText, setTaggsText] = useState(me?.taggs?.join(', ') ?? "");

  const [taggs, setTaggs] = useState(me?.taggs ?? []);

  const [links, setLinks] = useState(me.links ? (me.links.length === 0 ? [""] : me.links) : [""]);

  console.log(links, me)

  const [stage, setStage] = useState(me.profile.stage ?? 0);

  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const [isCategoryOpen, setCategoryOpen] = useState(false);

  const [isProfessionOpened, setProfessionOpened] = useState(false);

  const [categoryInformation, setCategoryInformation] = useState({
    category: categorys[0],
    profession: {},
  });

  useEffect( () => {
    if (categorys){
      setCategoryInformation({category : categorys[0], profession : {}})
    }
  }, [categorys] )

  const [errors, setErrors] = useState({
    descriptionError: false,
    taggsError: false});

  useEffect(() => {
    baidgeButtonController.controlText({ step, me, isChanging });
  }, [step, me, isChanging]);

  useEffect(() => {
    const notEmptyTaggs = taggs.filter( (tag) => tag.length !== 0 )
    const lErrors = {
      descriptionError: false,
      taggsError: false,
    };

    if (description.length > 500 || description.length < 5) {
      lErrors.descriptionError = true;
    }
    if (notEmptyTaggs.length > 5 || notEmptyTaggs.length === 0){
        lErrors.taggsError = true
    }
    setErrors(lErrors);
  }, [description, links, taggs]);

  useEffect(() => {
    baidgeButtonController.controlVisability({ errors, isCategoryOpen, isProfessionOpened, step });
  }, [errors, isCategoryOpen, isProfessionOpened, step]);


  const postBaidge = async () => {
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
  }

  const goFoward = baidgeButtonController.forwardFunction({
    setStep,
    step,
    isCategoryOpen,
    isProfessionOpened,
    description,
    dispatch,
    links,
    professionId : categoryInformation?.profession?.id,
    taggs,
    postBaidge
  });
  useEffect(() => {
    const goBack = baidgeButtonController.backFunction({
      navigate,
      step,
      setStep,
      isCategoryOpen,
      isProfessionOpened,
    });
    MainButton.onClick(goFoward);
    BackButton.onClick(goBack);
    return () => {
      MainButton.offClick(goFoward);
      BackButton.offClick(goBack);
    };
  }, [step, navigate, setStep, isCategoryOpen, isProfessionOpened, goFoward, description, links, taggs, dispatch, categoryInformation?.profession?.id]);

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
      <BaidgeCreaitingOne
        setStage={setStage}
        stage={stage}
        categoryInformation={categoryInformation}
        isCategoryOpen={isCategoryOpen}
        isProfessionOpened={isProfessionOpened}
        setCategoryInformation={setCategoryInformation}
        setCategoryOpen={setCategoryOpen}
        setProfessionOpened={setProfessionOpened}
        description={description}
        setDescription={setDescription}
        taskInformation={taskInformation}
      />
      <BaidgeCreatingTwo
        links={links}
        setLinks={setLinks}
        setTaggs={setTaggs}
        setTaggsText={setTaggsText}
        taggs={taggs}
        taggsText={taggsText}
      />
    </div>
  );
};

export default BaidgeCreating;
