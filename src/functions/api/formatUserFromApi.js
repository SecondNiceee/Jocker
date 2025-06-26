export const formatUserFromApi = (userFromApi, userCards) => {
    const photoUrl = userFromApi.photo ?? "";
    return ( {
        firstName: userFromApi.fl.split(' ')[0],
        lastName: userFromApi.fl.split(' ')[1] ?? "",
        fl : userFromApi.fl,
        address : userFromApi.address,
        mnemonic : userFromApi.mnemonic,
        id: userFromApi.id,
        views : userFromApi.views,
        link : userFromApi.link,
        photo: photoUrl,
        profile : {
          about : userFromApi.about,
          stage : userFromApi.stage,
          cards : userCards
        },
        about : userFromApi.about,
        stage : userFromApi.stage,
        deals : userFromApi.deals,
        completedTasks : userFromApi.completedAdvertisements,
        congradulations : userFromApi.congradulations,
        lastTransaction : userFromApi.lastTransaction,
        congratulate : userFromApi.congratulate,
        userLikes : userFromApi.userLikes,
        profession : userFromApi.profession,
        links :  userFromApi.links,
        taggs : userFromApi.taggs ?? [],
        rating : userFromApi.rating,
        createdAt : userFromApi.createdAt
      } );
}