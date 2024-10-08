import axios from "axios";

export default async function makeNewUser(order) {
  const newUser = { ...order.user };
  try {
    if (newUser.photo.includes("http")) {
      const response = await axios.get(newUser.photo);
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
        }
      );
      newUser.photo = responce.data;
    } catch (e) {
      newUser.photo = "";
    }
  }
  return newUser;
}