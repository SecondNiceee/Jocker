import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import makeFile from "../functions/makeFile";



export const deleteServerCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        try{
            await axios.delete("https://back-birga.ywa.su/card" , {
                params : {
                    id : data
                }
            }
            )
            console.log('по приколу тут')
            console.log(data)
            return data
        }
        catch(e){
            alert(JSON.stringify(e))
            console.warn(e)
        }
    }
)

export const putCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        try{
            let im = await axios.put("https://back-birga.ywa.su/card" , data[0] , 
                {
                    params : {
                        id : data[1]
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Contrsol-Allow-Origin": "*"
                      },
                }
            )
            let photos = []
            data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)
             })
             let localCard = {
                ...data[2],
                photosNames : im.data.photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(a){
            console.warn(a)
        }
    }
)
export const postCard = createAsyncThunk(
    "telegramUserInfo/postUserInfo",
    async function (data){
        try{
            let im = await axios.post("https://back-birga.ywa.su/card" , data[0] , 
                {
                    params : {
                        userId : data[1]
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Control-Allow-Origin": "*"
                      },
                }
             )
             let photos = []
             data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)

             })
            console.log(im)
            let localCard = {
                ...data[2],
                photosNames : data[2].photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(e){
            console.warn(e)
        }
    }
)
export const putUserInfo = createAsyncThunk(
    "telegramUserInfo/putUserInfo",
    async function (data){
        try{
            await axios.put('https://back-birga.ywa.su/user' , data[0] , {
                params : {
                    userId : data[1],
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Control-Allow-Origin": "*"
                      },
                }
            })
            return true
        }
        catch(e){
            console.warn(e)
        }
    }
)
export const fetchUserInfo = createAsyncThunk(
  "telegramUserInfo/fetchUserInfo",
  async function () {
    try {

        // let firstName = window.Telegram.WebApp.initDataUnsafe.user.first_name;
        // let lastName = window.Telegram.WebApp.initDataUnsafe.user.last_name;
        let firstName = 'Коля'
        let lastName = 'Титов'
        if (firstName.length > 15) {
          firstName = firstName.slice(0, 15) + "..";
        }
        if (lastName.length > 15) {
          lastName = lastName.slice(0, 15) + "..";
        }
        let UserId = "2144832745" ;
        let user = await axios.get("https://back-birga.ywa.su/user/findOne", {
          params: {
            id: UserId,
          },
        });

        let localCards = []

        let allCards = await axios.get("https://back-birga.ywa.su/card/findByUser" , {
            params : {
                userId : UserId
            }
        })
        allCards.data.forEach(e => {
            let files = makeFile(e.files , e.photos)
            localCards.push({
                id : e.id,
                title : e.title,
                description : e.description,
                behanceLink : e.behance,
                dribbbleLink : e.dribble,
                dropfileLink : e.dropFile,
                photosNames : e.photos,
                photos : files
            })
        }
        )
        return ( {
            firstName: firstName,
            lastName: lastName,
            id: UserId,
            photo: user.data.photo,
            about : user.data.about,
            stage : user.data.stage,
            cards : localCards
          } );
    }
    catch (e){
        console.log(e)
    }

    // let photo = 'бла бла фото еб'


  }
);

const telegramUserInfo = createSlice({
  name: "telegramUserInfo",
  initialState: {
    state: null,
    id: "",
    photo: "",
    firstName: "неверный ферст нэйм",
    lastName: "",
    profile : {
        about : 'Я Коля привет',
        stage : 29,
        cards : [
        ]
    },
  },
  reducers : {
    changeProfile(state , action){
        state.profile = action.payload
    },
    addCard(state, action){
        state.profile.cards.push(action.payload)
    },
    changeCards(state, action){
        state.profile.cards[action.payload.id] = action.payload.card
    },
    deleteCard(state , action){
        state.profile.cards = state.profile.cards.filter((e, i) => {
            return i !== action.payload
        })

    }
},
  
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.status = "yes";
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.photo = action.payload.photo;
      state.profile = {...state.profile , about : action.payload.about, stage : action.payload.stage === null ? '0' : action.payload.stage};
      state.profile.cards = action.payload.cards;
      state.profile.userId = action.payload.id
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(postCard.fulfilled , (state , action) => {
        state.profile.cards.push(action.payload)
    });
    builder.addCase(putCard.fulfilled , (state , action) => {
        state.profile.cards = state.profile.cards.map( (e) => {
            if (e.id === action.payload.id){
                return action.payload
            }
            else{
                return e
            }
        }
        )
    })
  },
});

export default telegramUserInfo.reducer;
export const {changeProfile, addCard, changeCards, deleteCard} = telegramUserInfo.actions
