import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import makeFile from "../functions/makeFile";
import makeNameFiles from "../functions/makeNameFiles";
export const deleteShablon = createAsyncThunk(
  "shablon/deleteShablon",
  async function(id){
    try{
      await axios.delete("https://back-birga.ywa.su/template" , {
        params : {
          id : id
        }
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
      let im = await axios.put("https://back-birga.ywa.su/template" , data[0] , 
        {
          params : {
            id : data[1]
          }
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
      alert('!')
        console.log(e)
    }
  }
)
export const postShablon = createAsyncThunk(
  "shablon/postShablon",
  async function(data){
    try{
        let im = await axios.post("https://back-birga.ywa.su/template" , data[0] , 
        {
          params : {
            userId : "2144832745"
          }
        }
        )

        let localShablon = data[1]
        let files = makeNameFiles(data[1].photos, im.data.photos)
        return {
          ...data[1],
          photos : files,
          photosNames : im.data.photos,
          id : im.data.id
        }
        

    }
    catch(e){
      console.warn(e)
    }
  }
)
export const fetchAllShablons = createAsyncThunk(
  "shablon/fetchAllShablons",
  async function(id){
    try{
        let im = await axios.get("https://back-birga.ywa.su/template/findByUser" , 
            {
                params : {
                    userId : 2144832745
                    // userId : window.Telegram.WebApp.initDataUnsafe.user.id 
                }
            }
        )
      
        let localShablons = []
        let servShablons = im.data
      
        servShablons.forEach((e,i) => 
          {
            let files = []
            if (e.files){
               files = makeFile(e.files, e.photos)
            }
                localShablons.push({
                    id : e.id,
                    name : e.name,
                    text : e.text,
                    photos : files, // photos - это файлы
                    photosNames : e.photos // photosNames - это фотки
                })
            
            }
        ) 
      
        console.log(localShablons)
        
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
    shablonsArr: [
      { name: "Шаблон 1", description: "Это шаблон один хахахах", photos: [] },
      { name: "Шаблон 2222", description: "Это шаблон два хахахах", photos: [] },
    ],
  },
  reducers : {
    
  },
  extraReducers : (builder) => {
    builder.addCase(fetchAllShablons.fulfilled , (state , action) => {
        state.shablonsArr = action.payload
    })
    builder.addCase(postShablon.fulfilled , (state , action) => {
      state.shablonsArr.push(action.payload)
    })
    builder.addCase(putShablon.fulfilled , (state, action) => {
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
