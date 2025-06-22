import axios from "axios";

export const getCardById = async (id) => {
  let response = await axios.get(
    `${process.env.REACT_APP_HOST}/card/findOne`,
    {
      params: {
        id: id
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
      },
    }
  );
  const card = response.data;
    let files = card.photos
    const formattedCard =  {
      id: card.id,
      title: card.title,
      description: card.description,
      photosNames: card.photos,
      photos: files,
      createdAt: card.createdAt,
      views: card.views,
      links: card.links,
    };
  return formattedCard;
};