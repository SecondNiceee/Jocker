import { createSlice } from "@reduxjs/toolkit";
import { deleteServerCard } from "./thunks/deleteServerCard";
import { dislikeUser } from "./thunks/dislikeUser";
import { likeUser } from "./thunks/likeUser";
import { fetchUserInfo } from "./thunks/fetchUserInfo";
import { postCard } from "./thunks/postCard";
import { putCard } from "./thunks/putCard";
import { fetchCommonRating } from "./thunks/fetchCommonRating";
import { fetchRatingByProfession } from "./thunks/fetchRatingByProfession";
import { fetchFeedBacks } from "./thunks/fetchFeedbacks";

const telegramUserInfo = createSlice({
  name: "telegramUserInfo",
  initialState: {
    state: null,
    postState : null,
    rating : 0,
    putState : null,
    status : "loading",
    id: null,
    photo: "",
    fl : "",
    link : "",
    createdAt : new Date(),
    linkes : 0,
    firstName: "неверный ферст нэйм",
    lastName: "",
    completedTasks : [],
    deals : 0,
    views : 0,
    lastTransaction : "NO",
    congratulate : null,
    links : [],
    taggs : [],
    profession : null,
    responsesCounter : null,
    ratingByProfession : null,
    commonRating : null,
    feedbacks : null,
    userLikes : [],
    profile : {
        about : "",
        stage : 0,
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
    builder.addCase(fetchFeedBacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
    })
    builder.addCase( deleteServerCard.fulfilled, (state, action) => {
        state.profile.cards = state.profile.cards.filter( (card) => card.id !== action.payload )
    } )

    builder.addCase(dislikeUser.fulfilled, (state, action) => {
        state.userLikes = state.userLikes.filter( (like) => like.user.id !== action.payload )
    } );

    builder.addCase(dislikeUser.rejected, (state, action) => {
        console.warn(action.error);
    } );

    builder.addCase(likeUser.fulfilled , (state, action) => {
        state.userLikes.push({id : null, user : {id : action.payload}})
    });


    builder.addCase(likeUser.rejected, (state, action) => {
        console.warn(action.error);
    });

    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCommonRating.fulfilled, (state, action) => {
        state.commonRating = action.payload;
    })
    builder.addCase(fetchRatingByProfession.fulfilled, (state, action) => {
        state.ratingByProfession = action.payload;
    })
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      console.warn({...state.profile , about : action.payload.about, stage : action.payload.stage === null ? '0' : action.payload.stage});
      state.lastTransaction = action.payload.lastTransaction
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.fl = action.payload.fl
      state.lastName = action.payload.lastName;
      state.photo = action.payload.photo ? action.payload.photo : "";
      state.profile = {...state.profile , about : action.payload.about, stage : action.payload.stage === null ? '0' : action.payload.stage};
      state.profile.cards = action.payload.profile.cards;
      state.profile.userId = action.payload.id
      state.completedTasks = action.payload.completedTasks
      state.deals = action.payload.deals
      state.mnemonic = action.payload.mnemonic
      state.address = action.payload.address
      state.createdAt = action.payload.createdAt
      state.congradulations = action.payload.address
      state.congratulate = action.payload.congratulate
      state.state = "yes";
      state.views = action.payload.views;
      state.link = action.payload.link;
      state.userLikes = action.payload.userLikes;
      state.profession = action.payload.profession; 
      state.links = action.payload.links;
      state.taggs = action.payload.taggs;
      state.rating = action.payload.rating;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(postCard.fulfilled , (state , action) => {
        state.postState = "complete"
        if (action.payload){
            state.profile.cards.push(action.payload)

        }
    });
    builder.addCase(postCard.pending , (state , action) => {
        state.postState = "pending"
    })
    builder.addCase(putCard.pending , (state , action) => {
        state.putState = "pending"
    })
    builder.addCase(putCard.fulfilled , (state , action) => {
         state.putState = "complete"
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
