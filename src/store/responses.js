import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import translation from "../functions/translate";
import en from "../constants/language";
import { USERID } from "../constants/tgStatic.config";
import $api from "../http";

export const fetchResponseByAdvertisement = createAsyncThunk(
    "fetchResponseByAdvertisement",
    async function([id, task, page]){
        let im = await $api.get(
            `${process.env.REACT_APP_HOST}/response/findByAdvertisement`,
            {
              params: {
                advertisementId: id,
                limit : 4,
                page : page
              },
            }
          );
          
          let responces = im.data;

          for (let i = 0; i < responces.length; i++) {
            let photos = [];
    
            if (responces[i].photos) {
              photos = responces[i].photos;
            }

            let b = await $api.get(`${process.env.REACT_APP_HOST}/card/countByUser` , {
                params : {
                    advertisementId: responces[i].user.id,
                },
            } )
    
            responces[i].photos = photos;
            responces[i].advertisement = task
            responces[i].user.cardsNumber = b.data;
            
            // if (responces[i].user.profession){
            //     try{
            //         const {commonRating, ratingByProfession} = await fetchUserRating(responces[i].user);
            //         responces[i].user.commonRating = commonRating;
            //         responces[i].user.ratingByProfession = ratingByProfession;
            //     }
            //     catch(e){
            //         console.warn("Не удалось найти рейтинг ")
            //     }
            // }
            
            try {
              let imTwo = await $api.get(
                `${process.env.REACT_APP_HOST}/advertisement/findCount`,
                {
                  params: {
                    userId: responces[i].user.id,
                  },
                }
              );
              responces[i].createNumber = imTwo.data;
            } catch (e) {
               console.warn(e)
              window.Telegram.WebApp.showAlert(e);
            }
          }
    
          return responces;
    }
)

export const deleteResponse = createAsyncThunk(
    "deleteResponse",
    async function(id){
        try{

            await $api.delete(`${process.env.REACT_APP_HOST}/respon    se`, {
                params : {
                    id : id
                },
            })
            return id
        }
        catch(e){
            console.log(e)
            window.Telegram.WebApp.showAlert(e)
        }
    }
)
export const setStartResponse = createAsyncThunk(
    "setStartResponse",
    async function([responce , advertisement]){
        let myData = new FormData()
        myData.append("isWatched" , "inProcess")
        const messageOne = translation("📣✅ Вы были выбраны исполнителем на задание")
        try{
            await $api.put(`${process.env.REACT_APP_HOST}/response` , myData, {
                params : {
                    id : responce.id
                },
            } )

            await $api.get(`${process.env.REACT_APP_HOST}/user/sendMessage`, {
                params: {
                  chatId: responce.user.id,
                  text:
                  messageOne + ` «<b>${advertisement.taskName}</b>»` ,
                  buttonUrl:
                    "https://connectbirga.ru/MyAds?open=1" ,
                    languageCode : en ? "en" : "ru"
                },
              });

              
        }

        catch(e){
            window.Telegram.WebApp.showAlert(e)
        }
        return "something"
    }
)
export const addResponse = createAsyncThunk(
    "addResponse" , 
    async function (par){
        try{

            const messageOne = translation("📣 Вы получили отклик на задачу «")
            const messageTwo = translation("» от ")
            await $api.post(`${process.env.REACT_APP_HOST}/response` , par[0], {
                params : {
                    advertisementId : par[1].advertisement.id,
                    userId : par[1].user.id
                },
            })

            const en = true
            
            await $api.get(`${process.env.REACT_APP_HOST}/user/sendMessage` , {
                params : {
                  "chatId" : par[1].advertisement.user.chatId,
                  "text" : messageOne + par[1].advertisement.taskName.bold() + messageTwo +  par[1].user.fl ,
                  "languageCode" : en ? "en" : "ru"
                },
              })

            return par[1]
        }
        catch(e){
            console.log(e)
            window.Telegram.WebApp.showAlert(e)
        }
        
    }
)
export const postResponse = createAsyncThunk(
    "postResponse" , 
    async function(id){
        let myData = new FormData()
        myData.append("isWatched" , "watched")
        try{
            await $api.put(`${process.env.REACT_APP_HOST}/response` , myData, {
                params : {
                    id : id
                },
            } )
        }
        catch(e){
            window.Telegram.WebApp.showAlert(e)
        }
    }
)
export const fetchResponses = createAsyncThunk(
    "fetchResponses",
    async function (par){
        try{

        let im = await $api.get(`${process.env.REACT_APP_HOST}/response/findByUser` , {
            params : {
                "userId" : USERID,
                page : par[1],
                limit : 4
                
            },
        })

        let localResponses = im.data

        let me = par[0]        

        for (let i = 0; i < localResponses.length; i++){

            const advertisementData = await $api.get(`${process.env.REACT_APP_HOST}/advertisement/findOne`, {
                params : {
                    "id" : localResponses[i].advertisement.id
                },
            })

            const advertisement = advertisementData.data
            let one = new Date(advertisement.startTime)
  
            let two;
            if (advertisement.endTime){
               two = new Date(advertisement.endTime)
            }
            else{
               two = ""
            }

            let files = advertisement.photos;

            try {
                let imTwo = await $api.get(
                  `${process.env.REACT_APP_HOST}/advertisement/findCount`,
                  {
                    params: {
                      userId: me.id,
                    },
                  }
                );
                localResponses[i].createNumber = imTwo.data;
              } catch (e) {
                 console.warn(e)
                window.Telegram.WebApp.showAlert(e);
              }
            
            const advertisementUser = await $api.get(`${process.env.REACT_APP_HOST}/user/findOne` , {
                params : {
                    "id" : advertisement.user.id
                },
            })

            const advertisementCrateNumber = await $api.get(`${process.env.REACT_APP_HOST}/advertisement/findCount` , {
                params : {
                    "userId" : localResponses[i].advertisement.user.id
                },
            })

            const advertisementError = {
                id : advertisement.id,
                taskName : advertisement.title,
                status : advertisement.status,
                executionPlace: "Можно выполнить удаленно",
                time : {start : one , end : two},
                tonValue : advertisement.price,
                taskDescription : advertisement.description,
                photos : files,
                photosName : advertisement.photos,
                customerName : me.firstName,
                userPhoto : me.photo ? me.photo : "",
                rate : '5',
                isActive : true,
                creationTime : advertisement.createdAt,
                category : advertisement.category.id,
                viewsNumber : advertisement.advertisement,
                user : advertisementUser.data,
                createNumber : advertisementCrateNumber.data,
                responces : advertisement.responses
            }
            // const newUser = await makeNewUser(advertisementError)
            
            localResponses[i].advertisement = {...advertisementError}

            console.warn(localResponses[i].advertisement)

        
            let photos = [];
    
            if (localResponses[i].photos) {
              photos = localResponses[i].photos;
            }
    
            localResponses[i].photos = photos;
    
            try {
              localResponses[i].user = {
                "id" : me.id,
                "fl" : me.firstName,
                "link" : me.link,
                "photo" : me.photo ? me.photo : "",
                "about" : me.profile.about,
                "stage" : me.profile.stage,
                "completedAdvertisements" : me.completedTasks
                
              }
            } catch (e) {
              window.Telegram.WebApp.showAlert(e);
            }
            


        }
        return localResponses
    }
    catch(e){
        window.Telegram.WebApp.showAlert(e)
        console.log(e)
    }
    }
)

const responses = createSlice({
    name : 'responses',
    initialState : {
        status : null,
        responsesByAStatus : null,
        responses : [],
        responsesByA : [],
        responsesByAIds : [],
        startStatus : "completed",
        responseIds : []
    },
    reducers :{
        clearResponses(state,action){
            state.status = null
            state.responses = []
            state.responseIds = []
            
        },
        clearResponsesByA(state , action){
            state.responsesByAStatus = "pending"
            state.responsesByAIds = []
            state.responsesByA = []
        }
    },
    extraReducers : builder => {

        builder.addCase(fetchResponseByAdvertisement.fulfilled, ((state , action) => {
            state.responsesByAStatus = "completed"
            state.responsesByA.push(...action.payload.filter(e => !state.responsesByAIds.includes(e.id)))
            state.responsesByAIds.push(...action.payload.map(e => e.id))
            if (action.payload.length < 4){
                state.responsesByAStatus = "all"
            }
        }))

        builder.addCase(fetchResponseByAdvertisement.pending, ((state , action) => {
            if (state.responsesByA.length === 0){
                state.responsesByAStatus = "pending"
            }
            else{
                state.responsesByAStatus = "completed"
            }
        }))

        builder.addCase(deleteResponse.fulfilled, ((state , action) => {
            state.responses = state.responses.filter((e , i ) => e.id !== action.payload)
        }))
        builder.addCase(addResponse.fulfilled, ( (state , action) => {
            state.responses.push(action.payload)
        }))
        builder.addCase(fetchResponses.pending , ((state , action) => {
            if (state.responses.length === 0){
                state.status = "pending"
            }
            else{
                state.status = "complete"
            }
        }  ))
        builder.addCase(fetchResponses.fulfilled , ((state , action) => {
            state.responses.push(...action.payload.filter(e => !state.responseIds.includes(e.id)))
            state.responseIds.push(...action.payload.map(e => e.id))
            if (action.payload.length < 4){
                state.status = "all"
            }
            else{
                state.status = "complete"
            }
        }))
        builder.addCase(setStartResponse.pending , ((state) => {
            state.startStatus = "pending"
        }))
        builder.addCase(setStartResponse.fulfilled, ((state) => {
            state.startStatus = "completed"
        }))

    }
})
export const {clearResponses , clearResponsesByA} = responses.actions
export default responses.reducer