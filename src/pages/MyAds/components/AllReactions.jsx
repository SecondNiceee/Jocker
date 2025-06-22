import React from "react";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ReactionBlock from "./ReactionBlock";
import { useSelector } from "react-redux";

const AllReactions = ({
  setFilterBy,
  responces,
  filteredArray,
  getMore,
  setPhotos,
  setPhotoIndex,
  setSliderOpened
}) => {
  const status = useSelector( state => state.responses.responsesByAStatus )

  return (
    <>
      {status === "pending" ? (
        <MyLoader
          style={{
            height: "calc(calc(100vh) - 456px)",
            position: "fixed",
            left: 0,
          }}
        />
      ) : (
        <ReactionBlock
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSliderOpened}
          getMore = {getMore}
          setFilterBy={setFilterBy}
          responces={filteredArray}
        />
      )}
    </>
  );
};

export default AllReactions;
