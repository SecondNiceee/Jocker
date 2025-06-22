import axios from "axios";

export const getAdvertisementById = async (id) => {
  const task = await axios.get(
    `${process.env.REACT_APP_HOST}/advertisement/findOne`,
    {
      params: {
        id: id,
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
      },
    }
  );
  const order = task.data;
  let one = new Date(order.startTime);
  let two;
  if (order.endTime) {
    two = new Date(order.endTime);
  } else {
    two = "";
  }

  let files = order.photos;

  let imTwo = await axios.get(
    `${process.env.REACT_APP_HOST}/advertisement/findCount`,
    {
      params: {
        userId: order.user.id,
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
      },
    }
  );

  const newUser = { ...order.user };

  try {
    if (newUser.photo.includes("http")) {
      await axios.get(newUser.photo);
    }
  } catch {
    try {
      const responce = await axios.put(
        `${process.env.REACT_APP_HOST}/user/photo`,
        {},
        {
          params: {
            userId: newUser.id,
          },
          headers: {
            "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
          },
        }
      );
      newUser.photo = responce.data;
    } catch (e) {
      newUser.photo = "";
    }
  }

  const formattedTask = {
    
    id: order.id,
    taskName: order.title,
    executionPlace: "Можно выполнить удаленно",
    time: { start: one, end: two },
    tonValue: order.tonPrice,
    rubleValue : order.price,
    taskDescription: order.description,
    photos: files,
    photosNames: order.photos,
    customerName: order.user.fl,
    userPhoto: order.user.photo ? order.user.photo : "",
    rate: "5",
    isActive: true,
    creationTime: order.createdAt,
    viewsNumber: order.views,
    responces: order.responses,
    status: order.status,
    user: newUser,
    createNumber: imTwo.data,
    category: order.category.id,
    subCategory: order.subCategory.id,
  };
  return formattedTask;
};
