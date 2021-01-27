import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


const feedBackSlice = createSlice({
    name:'feedBack',
    initialState:{
        feedBackUsed: {
            id:1
        }

    },
    reducers:{

    },
    extraReducers:{

    }
})

export const {} = feedBackSlice.actions;
export default feedBackSlice.reducer;