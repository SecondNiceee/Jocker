import { createSlice } from "@reduxjs/toolkit";

export const baidgeCreatingSlice = createSlice({
    name : "baidgeCreatingSlice",
    initialState : {
        categoryInformation : {
            category : null,
            profession : null
        },
        stage : null,
        links : null,
        taggs : null,
        taggsText : null,
        description : null,
        isFilled : false
    },
    reducers : {
        setBaidgeCreating(state, action){
            return {...state, ...action.payload};
        },
        setCategoryInformation(state, action){
            state.categoryInformation = action.payload;
        },
        setStage(state, action){
            state.stage = action.payload;
        },
        setLinks(state, action){
            state.links = action.payload;
        },
        setTaggs(state, action){
            state.taggs = action.payload;
        },
        setTaggsText(state, action){
            state.taggsText = action.payload;
        },
        setDescription(state, action){
            state.description = action.payload;
        }
    }
})
export const {setCategoryInformation, setBaidgeCreating, setDescription, setLinks, setStage, setTaggs, setTaggsText} = baidgeCreatingSlice.actions;