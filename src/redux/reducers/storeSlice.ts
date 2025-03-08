import storeData from "../../mockData/stores.json";
import { storeDetailsType } from "../../types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface InitialStateType {
    storeDetails: storeDetailsType[];
  }
  
  // Define initial state
  const initialState: InitialStateType = {
    storeDetails: storeData, // Use mapped JSON data
  };




const storeReducer = createSlice({
  name: "Stores",
  initialState,
  reducers: {
    addStores: (state, action: PayloadAction<storeDetailsType>) => {
      state.storeDetails.push(action.payload);
    },
    removeStores: (state, action: PayloadAction<number>) => {
      state.storeDetails = state.storeDetails.filter(
        (store) => store.id !== action.payload
      );
    },
    updateStores: (state, action: PayloadAction<storeDetailsType>) => {
      const index = state.storeDetails.findIndex(
        (store) => store.id === action.payload.id
      );
      
      if (index !== -1) {
        state.storeDetails[index] = { ...action.payload }; // Ensure payload is an object
      }
    },
    
  },
});

export const { addStores, removeStores, updateStores } = storeReducer.actions;
export default storeReducer.reducer;



