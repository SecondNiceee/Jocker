import axios from "axios";

export default async function makeNewUser(order) {
  const newUser = { ...order.user };
  try {
    if (newUser.photo.includes("http")) {
      await axios.get(newUser.photo);
    }
  } catch {
    try {
      const responce = await axios.put(
        "https://www.connectbirga.ru/user/photo",
        {},
        {
          params: {
            userId: newUser.id,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
           } 
        }
      );
      newUser.photo = responce.data.photo;
    } catch (e) {
      newUser.photo = "";
    }
  }
  return newUser;
}
