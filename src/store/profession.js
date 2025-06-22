import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProfessions = createAsyncThunk(
    'profession/getProfessions',
    async function () {
        try{

            const response = await axios.get(`${process.env.REACT_APP_HOST}/profession/findAll` , {
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                }
            })
            const professions = response.data;
            return professions
        }
        catch(e){
            console.warn(e)
        }
    }
)

const profession = createSlice({
    name : "professions",
    initialState : {
        professionsStatus : null,
        professions : []
    },
    reducers : {

    },
    extraReducers : builder => {
        builder.addCase(getProfessions.fulfilled, (state, action) => {state.professionsStatus = "fulfilled" 
            state.professions = action.payload
        })
        builder.addCase(getProfessions.pending, (state) => {state.professionsStatus = "pending"})
        builder.addCase(getProfessions.rejected, (state) => {state.professionsStatus = "rejected"})
    }
})

export default profession.reducer;