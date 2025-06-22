import { createSlice } from "@reduxjs/toolkit";

const taskCreating = createSlice({
  name: "taskCreating",
  initialState: {
    firstPage: {
      category: null,
      subCategory: null,
      taskName: "",
      taskDescription: "",
      photos: [],
      customerName: "",
      creationTime: new Date(),
      userPhoto: "",
      time: { start: new Date(), end: new Date() },
    },
    secondPage: {
      budget: "0",
      tonValue: 0,
      startTime: new Date(0),
      endTime: new Date(0),
      singleTime: new Date(0),
      isPrivate: false,
      time: { start: new Date(), end: new Date() },
    },
  },
  reducers : {
    setFirstPage(state, action){
        state.firstPage = {...state.firstPage, ...action.payload}
    },
    setSecondPage(state, action){
        state.secondPage = {...state.secondPage, ...action.payload}
    }
  }
});

export default taskCreating.reducer;
export const {setFirstPage, setSecondPage} = taskCreating.actions;
