import { configureStore } from "@reduxjs/toolkit";

import pointsReducer from "./pointsSlice";
import productsReducer from "./productsSlice";
import customersReducer from "./customersSlice"

const store = configureStore({
    reducer: {
        points: pointsReducer,
        customer: customersReducer
    }
});

export default store;