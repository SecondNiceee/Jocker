export const formateTaskFromApi = (order, numberOfResponses, user) => {
  let one = new Date(order.startTime);
  const files = order.files;
  let two;
  if (order.endTime) {
    two = new Date(order.endTime);
  } else {
    two = "";
  }
  const formattedTask = {
        isOutSide : order.isOutSide,
        isUrgently : order.isUrgently,
        isWarranty : order.isWarranty,
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
        user: user,
        createNumber: numberOfResponses,
        category: order.category.id,
        subCategory: order.subCategory.id,
        outSideButtonUrl : order.outSideButtonUrl
  };
  return formattedTask;
}