import $api from "../../http";

export const getCardByUserId = async (id) => {
  const localCards = [];
  let allCards = await $api.get(
    `${process.env.REACT_APP_HOST}/card/findByUser`,
    {
      params: {
        userId: id,
      },
    }
  );
  for (let e of allCards.data) {
    let files = e.photos
    localCards.push({
      id: e.id,
      title: e.title,
      description: e.description,
      photosNames: e.photos,
      photos: files,
      createdAt: e.createdAt,
      views: e.views,
      links: e.links,
    });
  }
  return localCards;
};
