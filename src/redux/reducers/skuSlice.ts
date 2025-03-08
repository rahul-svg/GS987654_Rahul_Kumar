import skuData from "../../mockData/sku.json";
import { skuDetailsType } from "../../types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface InitialStateType {
    skuDetails: skuDetailsType[];
  }
  
  // Define initial state
  const initialState: InitialStateType = {
    skuDetails: skuData, // Use mapped JSON data
  };



const skuReducer = createSlice({
  name: "SKU",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<skuDetailsType>) => {
      state.skuDetails.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      state.skuDetails = state.skuDetails.filter(
        (store) => store.id !== action.payload
      );
    },
    updateSKU: (state, action: PayloadAction<skuDetailsType>) => {
      const index = state.skuDetails.findIndex(
        (sku) => sku.id === action.payload.id
      );
      if (index !== -1) {
        state.skuDetails[index] = action.payload;
      }
    },
  },
});

export const { addSKU, removeSKU, updateSKU } = skuReducer.actions;
export default skuReducer.reducer;



