import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const socketIoSlice = createSlice({
    name: 'socketIoSLice',
    initialState:{

    },
    reducers:{
        newMessage : (state, action) => {
            
            return state
        }
    }
})

export const { newMessage} = socketIoSlice.actions;
export default socketIoSlice.reducer;