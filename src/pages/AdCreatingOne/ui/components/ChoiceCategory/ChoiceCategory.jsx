import { useCallback, useEffect, useMemo, useState } from "react";
import cl from "./ChoiceCategory.module.css";
import BackButton from "../../../../../constants/BackButton";
import MainButton from "../../../../../constants/MainButton";
import useBlockInputs from "../../../../../hooks/useBlockInputs";
import { softVibration } from "../../../../../functions/softVibration";
import { disableColorAndActiveButton } from "../../../../../functions/disableColorAndActiveButton";
import { enableColorAndActiveButton } from "../../../../../functions/enableColorAndActiveButton";
import menuController from "../../../../../functions/menuController";
import { useDispatch, useSelector } from "react-redux";
import { setFirstPage } from "../../../../../store/taskCreating";
import { useNavigate } from "react-router";

const ChoiceCategory = ({ ...props }) => {
  useBlockInputs();

  
  useEffect(() => {
    MainButton.show();
  }, []);
  
  const categorys = useSelector((state) => state.categorys.category);
  
  const subCategorys = useSelector((state) => state.categorys.subCategory);

  
  const navigate = useNavigate();
  
  const [choisenCategory, setChoisenCategory] = useState(null);
  
  const dispatch = useDispatch();

  const taskInformation = useSelector( (state) => state.taskCreating.firstPage );

  useEffect( () => {
    if (taskInformation?.category?.category !== "Другое"){
    setChoisenCategory(taskInformation.category);
    }
    //eslint-disable-next-line
  }, [] )

  const setTaskInformation = useCallback(
    (par) => {
      console.warn(par);
      dispatch(setFirstPage(par));
    },
    [dispatch]
  );

  const buttonHandler = useCallback(() => {
    if (choisenCategory.category === "Другое") {
      setTaskInformation({
        category: choisenCategory,
        subCategory: subCategorys.find((e) => e.subCategory === "Другое"),
      });
    } else {
      console.warn("Сюда")
      let sortedCategorys = subCategorys.filter(
        (el) => el.category.id === choisenCategory.id
      );
      setTaskInformation({
        category: choisenCategory,
        subCategory: sortedCategorys.find((e) => e.subCategory === "Другое"),
      });
    }
    navigate(-1);
  }, [navigate, choisenCategory, setTaskInformation, subCategorys]);

  useEffect(() => {
    MainButton.setText("Готово");
    MainButton.onClick(buttonHandler);
    if (!choisenCategory) {
      disableColorAndActiveButton();
    } else {
      enableColorAndActiveButton();
    }
    return () => {
      enableColorAndActiveButton();
      MainButton.setText("ДАЛЕЕ");
      MainButton.offClick(buttonHandler);
    };
  }, [choisenCategory, buttonHandler, setTaskInformation, navigate, subCategorys]);

  const realCategorys = useMemo(() => {
    return categorys;
  }, [categorys]);

  useEffect(() => {
    function closeFunction() {
      navigate(-1);
    }
    BackButton.show();
    BackButton.onClick(closeFunction);
    return () => {
      BackButton.offClick(closeFunction);
    };
    // eslint-disable-next-line
  }, []);

  const categoryClickHandler = (category) => () => {
    if (category.id === choisenCategory?.id) {
      setChoisenCategory(false);
    } else {
      setChoisenCategory(category);
    }
    softVibration();
  };

  useEffect(() => {
    menuController.hideMenu();
    return () => {
      menuController.showMenu();
    };
  });
  return (
    <div className={cl.ChoiceCategory} {...props}>

        <div onClick={buttonHandler} className="fixed left-1/2 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer">
          MAIN BUTTON
        </div>
      <p className="mt-[13px] ml-[17px] font-sf-pro-display-400 font-extralight text-[13px] tracking-[0.02em] text-[#84898f] uppercase mb-[9px]">
        КАТЕГОРИИ
      </p>

      <div className="flex rounded-[10px] bg-[#21303f] flex-col pl-[16px] pr-[16px]">
        {realCategorys.map((category, id) => {
          return (
            <div
              onClick={categoryClickHandler(category)}
              className="grid cursor-pointer pt-[13px] grid-cols-[min-content_auto] gap-y-[10px] gap-x-[11px] w-full"
            >
              <div
                className={`rounded-full border-solid border-[1px] w-[21px] h-[21px] self-center flex justify-center items-center ${
                  choisenCategory?.id === category.id
                    ? "bg-[#2EA6FF] border-[#2EA6FF] "
                    : "border-[#384656]"
                }`}
              >
                <svg
                  className={`${
                    choisenCategory?.id === category.id ? "" : "hidden"
                  }`}
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.19553 10.5012C3.89935 10.5012 3.64759 10.3745 3.44027 10.1209L0.563626 6.60418C0.482176 6.50864 0.42294 6.41493 0.385918 6.32306C0.352598 6.23119 0.335938 6.13565 0.335938 6.03643C0.335938 5.81595 0.409982 5.63405 0.558072 5.49073C0.706162 5.34742 0.893125 5.27576 1.11896 5.27576C1.37442 5.27576 1.58915 5.38417 1.76315 5.60098L4.17331 8.63263L8.87702 1.23539C8.97327 1.0884 9.07323 0.985509 9.1769 0.926714C9.28056 0.864243 9.41014 0.833008 9.56563 0.833008C9.79147 0.833008 9.97658 0.902828 10.121 1.04247C10.2654 1.18211 10.3376 1.36033 10.3376 1.57714C10.3376 1.66534 10.3227 1.75353 10.2931 1.84172C10.2635 1.92992 10.2172 2.02178 10.1543 2.11733L4.95634 10.0989C4.77863 10.3671 4.52503 10.5012 4.19553 10.5012Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.333387"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-[3px]">
                <h3 className="font-light tracking-[-3.6%]  text-[17px] text-white font-sf-pro-text-400 leading-[17px]">
                  {category.category}
                </h3>
                <p className="font-sf-pro-display-400 font-light tracking-[1%] leading-[17.7px] text-[14px] text-[#dbf5ff]">
                  {category.description}
                </p>
              </div>
              <div
                className={`h-[0.5px] col-start-2 col-end-3 w-[100%] bg-[#384656]  ${
                  id === realCategorys.length - 1 ? "opacity-0" : ""
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceCategory;
