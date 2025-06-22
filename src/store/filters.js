import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
  name: "filters",
  initialState: {
    advertisementsFilters: {
      category: { id: -1, category: "Все" },
      subCategory: null,
      price: 0,
    },
    createFilters: null,
    baidgeFilter: null,
  },
  reducers : {
    setAdvertisementFilters(state, action){
        state.advertisementsFilters = {...state.advertisementsFilters, ...action.payload}
    }
    
  }
});
export const {setAdvertisementFilters} = filters.actions;
export default filters.reducer;
