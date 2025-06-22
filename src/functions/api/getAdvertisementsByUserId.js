import axios from "axios";


export const getAdvertisementsByUserId = async (user, page, limit = 1) => {
    try{
        const tasks = []
        const advertisementsResponse = await axios.get(
            `${process.env.REACT_APP_HOST}/advertisement/findByUser`,
            {
              params: { 
                userId: user.id
              },
              headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              },
            }
          );
        const advertisements = advertisementsResponse.data;
        for (let order of advertisements) {
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
                userId: user.id,
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            }
          );

          const newUser = {...user}
          try{
            if (newUser.photo.includes('http')){
              await axios.get(newUser.photo)
            }
          }
          catch{
            try{
            const responce = await axios.put(`${process.env.REACT_APP_HOST}/user/photo`, {}, {
              params : {
                userId : newUser.id
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            })
            newUser.photo = responce.data
          }
          catch(e){ 
            newUser.photo = ""
          }
          }
          tasks.push({
            id: order.id,
            taskName: order.title,
            executionPlace: "Можно выполнить удаленно",
            time: { start: one, end: two },
            tonValue: order.price,
            taskDescription: order.description,
            photos: files,
            photosName: order.photos,
            customerName: user.firstName,
            userPhoto: user.photo ? user.photo : "",
            rate: "5",
            isActive: true,
            creationTime: order.createdAt,
            viewsNumber: order.views,
            responces: order.responses,
            status: order.status,
            user: newUser,
            createNumber : imTwo.data,
            category : order.category.id,
            subCategory : order.subCategory.id
          });
        }
        return tasks;
    }
    catch(e){
        console.warn(e);
        return []
    }

}