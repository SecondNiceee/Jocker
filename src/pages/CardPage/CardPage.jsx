import  { memo, useMemo } from "react";
import cl from "./CardPage.module.css";
import InnerCase from "../../components/CardPage/InnerCase/InnerCase";
import FullDescription from "../../components/First/FirstDetails/FullDescription";
import LinkComp from "../../components/CardPage/Link/LinkComp";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import translation from "../../functions/translate";
import useBlockInputs from "../../hooks/useBlockInputs";
const CardPage = ({ card, setPhotoIndex, setPhotos, setSlideOpened, ...props }) => {
  window.Telegram.WebApp.disableVerticalSwipes();

  useBlockInputs();

  const linksComponents = useMemo(() => {
    return (
      <div className={cl.cardsLinks}>
        {card.behanceLink.length > 0 ? (
          <LinkComp
            navigate={"behance"}
            link={card.behanceLink}
            name={translation("Ссылка на Behance")}
          />
        ) : (
          <></>
        )}

        {card.dribbbleLink.length > 0 ? (
          <LinkComp
            navigate={"driple"}
            link={card.dribbbleLink}
            name={translation("Ссылка на Dribbble")}
          />
        ) : (
          <></>
        )}

        {card.dropfileLink.length > 0 ? (
          <LinkComp
            navigate={"dropfile"}
            link={card.dropfileLink}
            name={translation("Ccылка на Dropfile")}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }, [card.dropfileLink, card.behanceLink, card.dribbbleLink]);



  return (
    <>
      {card.id === 0 ? (
        <MyLoader
          style={{
            transform: "translateX(-32px)",
          }}
        />
      ) : (
        <div {...props} className={cl.wrapper}>
          <InnerCase
            setPhotoIndex = {setPhotoIndex}
            setPhotos = {setPhotos}
            setSliderOpened = {setSlideOpened}
            task={card}
            title={card.title}
            description={card.description}
            photos={card.photos}
          />
          <FullDescription
            style={{
              marginTop: "8px",
            }}
            fullDescription={card.description}
          />
          {card.dropfileLink.length > 0}
          {linksComponents}
        </div>
      )}
    </>
  );
};

export default memo(CardPage);
