import $api from "../http";

export default async function makeNewUser(order) {
  const newUser = { ...order.user };
  try {
    if (newUser.photo.includes("http")) {
      await $api.get(newUser.photo);
    }
  } catch {
    try {
      const responce = await $api.put(
        `${process.env.REACT_APP_HOST}/user/photo`,
        {},
        {
          params: {
            userId: newUser.id,
          },
        }
      );
      newUser.photo = responce.data.photo;
    } catch (e) {
      newUser.photo = "";
    }
  }
  return newUser;
}
