import React, { memo, useMemo, } from "react";

const Photos = ({ photos, onClick = () => {}, isResponse, end = false,  isFirstDetailsPhotos, setPhotoIndex,
setPhotos,
setSliderOpened, }) => {
    const style = useMemo( () => {
        if (photos?.length === 1){
            return {
                width: "calc(100%)",
                marginLeft: "auto",
                marginRight: "auto",
              }
        }
        else{
            return {}
        }
    }, [photos] )

    const clickHandler = (id) => () => {;
      if (isFirstDetailsPhotos || isResponse){
        setPhotoIndex(id);
        setPhotos(photos);
        setSliderOpened(true)
      }
    }
  return (
    <>
      {photos && photos?.length ? (
        <div onClick={onClick} className="first__photos">
          {photos?.map((e, i) => {
            return (
              <img
                onClick={clickHandler(i)}
                key={i}
                src={end ? URL.createObjectURL(e) : e}
                style={style}
                className="first__photo"
                alt=""
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(Photos);
