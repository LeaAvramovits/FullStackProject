import { createSlice } from "@reduxjs/toolkit";

const pointsSlice = createSlice({
    name: "points",
    initialState: {
        pointsValue: 0
    },
    reducers: {
        addPoint: (state) => {
            state.pointsValue++;
        },
        deletePoint: (state) => {
            state.pointsValue--;
        },
        resetPoint: (state, action) => {
            state.pointsValue = 0;
        }
    }
});
 
export const { addPoint, deletePoint, resetPoint } = pointsSlice.actions;

export default pointsSlice.reducer;
