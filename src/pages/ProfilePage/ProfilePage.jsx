import React, { memo, useCallback, useEffect, useState } from "react";

import { CSSTransition } from "react-transition-group";
import CardPage from "../CardPage/CardPage";
import Stage from "../../components/UI/Stage/Stage";
import AboutMain from "../MyAds/components/AboutMain";
import AboutInfo from "../MyAds/components/AboutInfo";
import AboutTop from "../MyAds/components/AboutTop";
import axios from "axios";
import ExampleWorks from "../MyAds/components/ExampleWorks";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import Compact from "../../components/UI/Compact/Compact";
import "../MyAds/MyAds.css"
import BackButton from "../../constants/BackButton";
import { useNavigate } from "react-router-dom";

const menu = document.documentElement.querySelector(".FirstMenu")
let enter = true
const ProfilePage = ({ ...props }) => {
  useEffect( () => {
    
    const input = document.querySelectorAll('input');
    const textarea  = document.querySelectorAll('textarea');
    for (let smallInput of input){
      smallInput.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallInput.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
    for (let smallTextarea of textarea){
      smallTextarea.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallTextarea.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
  } , [] )


  const [responce, setResponce] = useState(null);
  useEffect(() => {});


//   window.Telegram.WebApp.showAlert(window.Telegram.WebApp.initDataUnsafe.start_param)
  window.Telegram.WebApp.disableVerticalSwipes();


  const navigate = useNavigate()



  const [cards, setCards] = useState(null);
  const [oneCards, setOneCard] = useState({
    isOpen: true,
    card: {    id: 0,
        title: "",
        description: "",
        behanceLink: "",
        dribbbleLink: "",
        dropfileLink: "",
        photosNames: "",
        photos: [],},
  });

  useEffect( () => {
    function backFunction(){
        if (oneCards.isOpen){
            enter = false
            setOneCard((value) => ({...value , isOpen : false}))
            
        }
        else{
            navigate("/")
        }
    }

    BackButton.show()
    BackButton.onClick(backFunction)
    return () => {
        BackButton.hide()
        BackButton.offClick(backFunction)
    }
  } , [oneCards.isOpen, navigate] )



  useEffect(() => {
    async function getAllCards() {
      let localCards = [];
      try {
        const user = await $api.get(`${process.env.REACT_APP_HOST}/user/findOne`, {
          params: {
            id: Number(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[1]),
          },
        });

        let imTwo = await $api.get(
            `${process.env.REACT_APP_HOST}/advertisement/findCount`,
            {
              params: {
                userId: Number(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[1]),
              },
            }
          );

        const cardOne = await $api.get(`${process.env.REACT_APP_HOST}/card/findOne`, {
            params : {
                id : Number(window.Telegram.WebApp.initDataUnsafe.start_param.split('m')[0])
            },
        })

        let allCards = await $api.get(
          `${process.env.REACT_APP_HOST}/card/findByUser`,
          {
            params: {
              userId: user.data.id,
            },
          }
        );

        for (let e of allCards.data) {
          let files = e.photos
          localCards.push({
            id: e.id,
            title: e.title,
            description: e.description,
            behanceLink: e.behance,
            dribbbleLink: e.dribble,
            dropfileLink: e.dropFile,
            photosNames: e.photos,
            photos: files,
          });
        }
        let newFiles = cardOne.data.photos;
        return {
          localCards: localCards,
          responce: { user: user.data, createNumber : imTwo.data },
          card : {
            id: cardOne.data.id,
            title: cardOne.data.title,
            description: cardOne.data.description,
            behanceLink: cardOne.data.behance,
            dribbbleLink: cardOne.data.dribble,
            dropfileLink: cardOne.data.dropFile,
            photosNames: cardOne.data.photos,
            photos: newFiles,
          }
        };
      } catch (e) {
        
        window.Telegram.WebApp.showAlert("Ссылка уже не действительна. Возможно, данные были удалены");
        navigate("/")
        console.log(e);
      }
    }
    getAllCards().then((value) => {
      setCards(value.localCards);
      setResponce(value.responce);
      setOneCard({isOpen : true , card : value.card})
    });
    // eslint-disable-next-line
  }, []);

  const openFunc = useCallback(
    (par) => {
      setOneCard({ isOpen: true, card: par });
    },
    [setOneCard]
  );

  return (

    <>
    <div style={
        {
            transform : "translateX(0%)"
        }
    } className="aboutReaction" {...props}>

      {responce !== null ? (
        <>

          <AboutTop responce={responce} />

          <AboutInfo responce={responce} />

          <AboutMain aboutU={responce.user.about} />

          <Compact className={"stage-compact"} title={"Стаж работы"}>
            <Stage numberB={responce.user.stage} />
          </Compact>



          {cards === null ? (
            <MyLoader />
          ) : (
            <ExampleWorks openFunc={openFunc} cards={cards} />
          )}
        </>
      ) : (
        <MyLoader style = {{
          transform : "translateX(-16px)"
        }} />
      )}
    </div>

    <CSSTransition
            classNames="left-right"
            in={oneCards.isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <CardPage style = {enter ? {transform : "translateX(0px)"} : {}} card={oneCards.card} />
          </CSSTransition>


    </>
  );
};
export default memo(ProfilePage);
