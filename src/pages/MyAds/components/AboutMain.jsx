import React from "react";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import Text from "../../../components/Text/Text";

const AboutMain = ({aboutU , aboutReaction}) => {
  return (
    <div className="aboutMain">
      <div className="aboutMeTitle">
        <Text>О себе</Text>
      </div>
      <TextAboutMe aboutU={aboutU} />
    </div>
  );
};

export default AboutMain;
