import $api from "../../http";

   export default async function getResponseById(id){
        let im = await $api.get(
            `${process.env.REACT_APP_HOST}/response/findOne`,
            {
              params: {
                id
              },
            }
          );
          let response = im.data;
            let photos = [];

            if (response.photos) {
                photos = response.photos;
            }
            response.photos = photos;
            return response;
          }
    