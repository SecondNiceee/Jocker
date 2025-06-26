import { USERID } from "../constants/tgStatic.config";

export const createResponseFormData = (response, advertisementId) => {
    let myFormData = new FormData();
    myFormData.append("information", String(response.text));
    myFormData.append("userId", String(USERID));
    myFormData.append("advertismentId", String(advertisementId));
    response.photos.forEach((e, i) => {
      myFormData.append(`photos`, e);
    });
    return FormData;
}