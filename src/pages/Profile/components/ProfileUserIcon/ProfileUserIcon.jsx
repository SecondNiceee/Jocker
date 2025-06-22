import React from 'react';

const ProfileUserIcon = ({photoUrl}) => {
    return (
        <img
        style={{ objectFit: "cover" }}
        src={photoUrl}
        className="w-[94px] h-[94px] rounded-full "
        alt=""
      />
    );
};

export default ProfileUserIcon;