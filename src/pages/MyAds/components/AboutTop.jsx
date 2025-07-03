import useGetUserPhotoLink from "../../../hooks/useGetUserPhotoLink";

const AboutTop = ({responce}) => {
  const userLink = useGetUserPhotoLink({anotherUserInfo : responce.user})
  return (
    <div className="about__top">
      <img style={{objectFit : "cover"}} src={userLink} alt="" className="topMiddle" />

    </div>
  );
};

export default AboutTop;
