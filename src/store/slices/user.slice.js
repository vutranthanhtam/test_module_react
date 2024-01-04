import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        cart: null,
        receipts: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setReceipts: (state, action) => {
            state.receipts = action.payload
        }
    }
})

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;