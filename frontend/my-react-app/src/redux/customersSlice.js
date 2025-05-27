import { createSlice } from "@reduxjs/toolkit";
import { fetchDataAsyncAction } from "./thunk";

const customersSlice = createSlice({
    name: "customer",
    initialState: {
        customerList: [],
        loading: false,
        error: false
    },
    
    // reducers: {
    //     addCustomer: (state, action) => {
    //         state.selectedList.push({ id: Date.now(), text: action.payload, completed: false });
    //     },
    //     deleteTodo: (state, action) => {
    //         state.selectedList = state.selectedList.filter(todo => todo.id !== action.payload);
    //     }
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsyncAction.pending, (state) => {
                state.loading = true;
                state.customerList = [];
                state.error = false;
            })
            .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
               state.customerList = action.payload;
               state.loading = false;
               state.error = false;
            })
            .addCase(fetchDataAsyncAction.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
});
 
export default customersSlice.reducer;
