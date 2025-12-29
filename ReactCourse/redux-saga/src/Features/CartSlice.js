import { createSlice } from "@reduxjs/toolkit";
const initialState={
    cart:[],
}
const cartSlice=createSlice({
    name:'Cart',
    initialState,
    reducers:{
        updateQuantity:(state,action)=>{
            state.cart=action.payload
        }
    }
})
export default cartSlice.reducer
export const {updateQuantity}= cartSlice.actions