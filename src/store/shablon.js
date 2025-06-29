import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeNameFiles from "../functions/makeNameFiles";
import { USERID } from "../constants/tgStatic.config";
import $api from "../http";

export const deleteShablon = createAsyncThunk(
  "shablon/deleteShablon",
  async function(id){
    try{
      await $api.delete(`${process.env.REACT_APP_HOST}/template` , {
        params : {
          id : id
        },
      })
      return id
    }
    catch(e){
      console.warn(e)
    }
  }
)
export const putShablon = createAsyncThunk(
  "shablon/putShablon" ,
  async function(data){
    try{
      let im = await $api.put(`${process.env.REACT_APP_HOST}/template` , data[0] , 
        {
          params : {
            id : data[1]
          },
        }
      )
      let photos = makeNameFiles(data[2].photos , im.data.photos)
      return {
          ...data[2],
          photos : photos,
          photosNames : im.data.photos,
          id : im.data.id
      }

    }
    catch(e){
      window.Telegram.WebApp.showAlert(JSON.stringify(e))
        console.log(e)
    }
  }
)
export const postShablon = createAsyncThunk(
  "shablon/postShablon",
  async function(data){
    try{
        let im = await $api.post(`${process.env.REACT_APP_HOST}/template` , data[0] , 
        {
          params : {
            userId : USERID
          },
          headers: {
            "Content-Type" :'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          },
        }
        )

        let files = makeNameFiles(data[1].photos, im.data.photos)
        return {
          ...data[1],
          photos : files,
          photosNames : im.data.photos,
          id : im.data.id
        }
        

    }
    catch(e){
      window.Telegram.WebApp.showAlert("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.")
      console.warn(e)
    }
  }
)
export const fetchAllShablons = createAsyncThunk(
  "shablon/fetchAllShablons",
  async function(id){
    try{
        let im = await $api.get(`${process.env.REACT_APP_HOST}/template/findByUser` , 
            {
                params : {
                    userId : USERID
                },
            }
        )
      
        let localShablons = []
        let servShablons = im.data
      
        for (let e of servShablons){
          
          let files = []
          if (e.photos){
             files = e.photos;
          }
              localShablons.push({
                  id : e.id,
                  name : e.name,
                  text : e.text,
                  photos : files, // photos - это файлы
                  photosNames : e.photos // photosNames - это фотки
          })
        }
        
          
            
            
        
      
          
        
        return localShablons
        

    }
    catch(e){
        console.warn(e)
    }
  }
    
)
const shablon = createSlice({
  name: "shablon",
  initialState: {
    status: null,
    postStatus : null,
    putStatus : null,
    shablonsArr: [
      { name: "Шаблон 1", description: "Это шаблон один хахахах", photos: [] },
      { name: "Шаблон 2222", description: "Это шаблон два хахахах", photos: [] },
    ],
  },
  reducers : {
    
  },
  extraReducers : (builder) => {
    builder.addCase(postShablon.pending , (state , action) => {
      state.postStatus = "pending"
  })
  builder.addCase(putShablon.pending , (state , action) => {
    state.putStatus = "pending"
  })


    builder.addCase(fetchAllShablons.fulfilled , (state , action) => {
        state.shablonsArr = action.payload
    })
    builder.addCase(postShablon.fulfilled , (state , action) => {
       state.postStatus = "complete"
      state.shablonsArr.push(action.payload)
    })
    builder.addCase(putShablon.fulfilled , (state, action) => {
      state.putStatus = "complete"
      state.shablonsArr = state.shablonsArr.map((e , i) => {
        if (e.id === action.payload.id){
          return action.payload
        }
        else{
          return e
        }
      })
    })
    builder.addCase(deleteShablon.fulfilled, (state , action) => {
      state.shablonsArr = state.shablonsArr.filter(e => 
          e.id !== action.payload
      )
    } ) 
  }
});
export default shablon.reducer;
