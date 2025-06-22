import React from "react";
import ModalChoicer from "../../components/UI/ModalChoicer/ModalChoicer";
import { filterValues } from "./constants/filterValues";
import { filterNames } from "./constants/filterNames";
import Case from "../../components/UI/Case/Case";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCard } from "../../store/information";

const CardsPageBody = ({setFilterBy, cards, setPhotoIndex, setPhotos, setSlideOpened, userInfo}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="pl-4 font-semibold font-sf-pro-display-600 text-white text-[20px]">
        Портфолио
      </h2>

      <div className="flex justify-between pl-4 pr-4 items-center mt-[12px]">
        <p className="font-sf-pro-display-400  font-normal text-[13px] text-[#84898F] uppercase leading-[15.6px]">
          Сортировка
        </p>
        <ModalChoicer
          setValue={(value) => {
            setFilterBy(value);
          }}
          className={"MyAds-choicer"}
          values={filterValues}
          names={filterNames}
          defaultValue={filterValues[0]}
        />
      </div>

      <div className="flex flex-col gap-2 w-full mt-2">
        {cards.map((card, i) => (
          <Case
            key={card.id}
            setPhotoIndex={setPhotoIndex}
            setPhotos={setPhotos}
            setSliderOpened={setSlideOpened}
            createdAt={card.createdAt}
            photos={card.photos}
            title={card.title}
            description={card.description}
            card={card}
            openFunc={() => {
              dispatch(setCard(card))
              navigate(`/card/${card.id}/${userInfo.id}`)
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CardsPageBody;
