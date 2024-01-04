import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: null,
        createModalState: false
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        changeStateCreateModal: (state,action) => {
            state.createModalState = !state.createModalState
        },
        addNewProduct: (state, action) => {
            state.data.push(action.payload)
        },
        deleteProduct: (state, action) => {
            return {
                ...state,
                data: state.data.filter(product => product.id !== action.payload)
            }
        }
    }
})

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;