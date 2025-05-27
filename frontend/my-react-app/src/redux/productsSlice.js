import { createSlice } from "@reduxjs/toolkit";
import { fetchDataAsyncAction } from "./thunk";

const productsSlice = createSlice({
    name: "products",
    initialState: {
       productsList: [],
       selectedList:[],
        loading: false,
        error: false
    },
    reducers: {
        addProduct: (state, action) => {
            state.selectedList.push({ id: Date.now(), text: action.payload, completed: false });
        },
        deleteTodo: (state, action) => {
            state.selectedList = state.selectedList.filter(todo => todo.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsyncAction.pending, (state) => {
                state.loading = true;
                state.productsList = [];
                state.selectedList=[];
                state.error = false;
            })
            .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
               state.productsList = action.payload;
               state.loading = false;
               state.error = false;
            })
            .addCase(fetchDataAsyncAction.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
});
 
export default productsSlice.reducer;
