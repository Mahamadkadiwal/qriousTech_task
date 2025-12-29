import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:0
}
export const CounterSlice=createSlice({
    name:'Counter',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value=state.value+1
        },
        decrement:(state)=>{
            state.value=state.value-1
        },
        reset:(state)=>{
            state.value=0
        },
        incrementByAmount:(state,action)=>{
            state.value=state.value+Number(action.payload)
        }
    },
})
export const {increment,decrement,reset,incrementByAmount} =CounterSlice.actions
export default CounterSlice.reducer


