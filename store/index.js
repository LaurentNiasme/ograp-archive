
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import imageSlice from './imageSlice';
import loginSlice from './loginSlice';
import userSlice from './userSlice';
import feedBackSlice from './feedBackSlice';

const reducer = combineReducers({
    messageSlice, imageSlice, loginSlice, userSlice, feedBackSlice
})

const store = configureStore({
    reducer,
});

export default store

