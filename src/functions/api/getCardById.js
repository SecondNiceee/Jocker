import $api from "../../http";

export const getCardById = async (id) => {
  let response = await $api.get(
    `${process.env.REACT_APP_HOST}/card/findOne`,
    {
      params: {
        id: id
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