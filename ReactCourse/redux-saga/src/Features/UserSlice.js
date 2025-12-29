import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchData=createAsyncThunk('fetchData',
    async () => {
              const response = await fetch('https://jsonplaceholder.typicode.com/users');
              return await response.json()

    }
)
const UserSlice=createSlice({
    name:'User',
    initialState:{
        users:[],
        isLoading:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchData.pending,(state)=>{
            state.isLoading=true,
            state.error=null
        })
        builder.addCase(fetchData.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.users=action.payload
        })
        builder.addCase(fetchData.rejected,(state,action)=>{
            state.isLoading=false,
            state.error=action.payload
        })
    //here we have three states:pending,fullfilled,rejected
        
    }
})
export default UserSlice.reducer    