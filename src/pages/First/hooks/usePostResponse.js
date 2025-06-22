import { useCallback } from "react";
import { createResponse } from "../../../functions/api/createResponse";
import menuController from "../../../functions/menuController";
import { useSelector } from "react-redux";

const usePostResponse = () => {
  const me = useSelector((state) => state.telegramUserInfo);
  const postResponse = useCallback(async (responce, detailsAdertisement) => {
    try {
      await createResponse({
        responseAdvertisement: detailsAdertisement,
        responce,
        responseUser: {
          id: me.id,
          fl: me.firstName,
          link: me.link,
          photo: me.photo ? me.photo : "",
          about: me.profile.about,
          stage: me.profile.stage,
        },
      });
    } catch (e) {
      console.warn(e);
    }
    menuController.showMenu();
  }, [me]);
  return postResponse;
};
export default usePostResponse;
