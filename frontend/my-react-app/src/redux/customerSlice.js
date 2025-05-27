import { createSlice } from "@reduxjs/toolkit";
import { fetchDataAsyncAction } from "./thunk";

const customerSlice=createSlice({
    name:"customer",
    initialState: {
        customerList: [],
        currentCustomer: null
        // loading: false,
        // error: false
    },
    reducers:{
    setCurrentCustomer: (state, action) => {
  state.currentCustomer = action.payload; // שמור את כל האובייקט, או לפחות { id }
  console.log("User ID:", action.payload.id); 
},
    logoutCustomer: (state) => {
      state.currentCustomer = null;
    },
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchDataAsyncAction.pending, (state) => {
                // state.loading = true;
                state.customerList = [];
                // state.selectedList=[];
                // state.error = false;
            })
            .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
               state.customerList = action.payload;
            //    state.loading = false;
            //    state.error = false;
            })
            .addCase(fetchDataAsyncAction.rejected, (state) => {
                // state.loading = false;
                // state.error = true;
            })
    }
})
export const { setCurrentCustomer, logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;