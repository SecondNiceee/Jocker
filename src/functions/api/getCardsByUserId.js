import axios from "axios";

export const getCardByUserId = async (id) => {
  const localCards = [];
  let allCards = await axios.get(
    `${process.env.REACT_APP_HOST}/card/findByUser`,
    {
      params: {
        userId: id,
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
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
