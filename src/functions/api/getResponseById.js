import axios from "axios";

   export default async function getResponseById(id){
        let im = await axios.get(
            `${process.env.REACT_APP_HOST}/response/findOne`,
            {
              params: {
                id
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
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
    