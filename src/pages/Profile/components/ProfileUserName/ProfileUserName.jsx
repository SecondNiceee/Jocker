import React from 'react';
import { getFormatedUserFullName } from '../../../../functions/getFormatedUserFullname';

const ProfileUserName = ({fl}) => {
    const formatedName = getFormatedUserFullName(fl, "")
    return (
      <h2 className="font-sf-compact-rounded tracking-wide font-medium text-white text-[23px]">
        {formatedName}
      </h2>
    );
};

export default ProfileUserName;