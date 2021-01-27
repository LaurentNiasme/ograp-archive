import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
require('dotenv').config();
const urlServer = process.env.REACT_APP_URL_SERVER

// console.log(urlServer, "url server")
  export const postLogine = createAsyncThunk(
      'loginSlice/postLogine',
      async(empty, { getState }) => {
          const { email, password } = getState().loginSlice
          const userExist = true
        try {
            const response =  await axios.post(`${urlServer}/login`, { "email": email, "password": password } )
        return (
            {
                error: false,
                data : response.data,
                status : response.statusText,
                headers : response.headers
            }
        )
        }catch(err){
            return ( {
                error: true,
                logError : err.response
            })
        }
    }
)

const loginSlice = createSlice ({
    name: "login",
    initialState: {
        email : "",
        password : "",
        role:"",
        isloged : "",
        MessageError: "",
        token : "",
        userId:null
    },
    reducers: {
        // onErrorLoged:(state, action) => {
        //     console.log("on error loged")
        //     state.isloged = "NO"
        // },
        onUserDisconnect :(state, action) => {
            // console.log("action pour se déco")
            state.isloged = "NOMORE"
            return (
              state
          ) 
          },
        onEmailInput:(state, action) => {
            state.email = action.payload
            return (
                state
            )
        },
        onPasswordInput:(state, action) => {
            state.password = action.payload
            return (
                state
            )
        },

        sendLogin:(state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password

            return (
                state
            )
        },
    } ,
    extraReducers: {

        [postLogine.fulfilled]: (state, action) => {
           
            if (action.payload.error) {
                state.isloged = "NO"
                state.MessageError = action.payload.error.data
                return state
            }
            else { 
            localStorage.setItem("userToken", action.payload.headers.authtoken);
            state.isloged = action.payload.status
            state.role= action.payload.headers.role
            state.userId = action.payload.headers.user_id
            return state } 
        },
    },
})

export default loginSlice.reducer;
export const {onEmailInput, onPasswordInput, sendLogin, onLoginAccept, onErrorLoged, onUserDisconnect } = loginSlice.actions;