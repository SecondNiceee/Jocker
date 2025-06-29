import useGetUserPhotoLink from "../../../hooks/useGetUserPhotoLink";
import RatingIcon from "../RatingIcon/RatingIcon";

const UserIcon = ({user, small}) => {
    const link = useGetUserPhotoLink({anotherUserInfo : user});
    return (
        <div className="relative">
            <RatingIcon small = {small} user={user} className={"absolute left-1/2 -translate-x-1/2"} />
            <img alt="icon" src={link} className="!w-[40px] !h-[40px] rounded-full" />
        </div>
    );
};

export default UserIcon;