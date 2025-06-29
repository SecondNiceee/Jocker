import Reaction from "./Reaction";

const ReactionSuspense = ({openAboutReactionFunc, responce, setOpen,setPhotos,
  setPhotoIndex,
  setSlideOpened}) => {

    return (
            <Reaction
            setPhotos = {setPhotos}
            setPhotoIndex = {setPhotoIndex}
            setSlideOpened = {setSlideOpened}
            openAboutReactionFunc={openAboutReactionFunc}
            responce={responce}
            setOpen={setOpen}
          />
    );
};

export default ReactionSuspense;