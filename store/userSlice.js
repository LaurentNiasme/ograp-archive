import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
require('dotenv').config();

const urlServer = process.env.REACT_APP_URL_SERVER;

export const fetchUser = createAsyncThunk(
    'user/fetchAllUser',
    async() => {
        const response = await axios.get(`${urlServer}/users`, 
                                          {headers: {authtoken:localStorage.getItem("userToken")}})
        return response.data
    }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async(id,{getState}) => {
    // console.log({authtoken:localStorage.getItem("userToken")})
      const response = await axios.get(`${urlServer}/userById/${id}`, {headers: {authtoken:localStorage.getItem("userToken")}})
      // console.log(response.data)
         

      return response.data
  }
);

export const postUser = createAsyncThunk(
  
  'userSlice/postUser',
  async(empty, { getState }) => {
      const { user } = getState().userSlice
      
      // console.log(user)
    
    try { const response = await axios.post(`${urlServer}/createUser`, {  
          "role": user.role|| '',
          "email": user.email,
          "password": user.password,
          "first_name": user.first_name|| '',
          "last_name": user.last_name|| '',
          "company_name": user.company_name|| '',
          "image": "" }, {headers: {authtoken:localStorage.getItem("userToken")}})


          // console.log(response.headers)
          // response ? console.log('user crée', response) : console.error()
          
          return (
            {
              responseData:response.data,
              responseHeader:response.headers
            }
            )
    }catch(err){
      // console.log(err.response.data)
      return (
              {errorInfo : err.response.data[0],
               error : "YES", }
              )
  }

  }
)


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            role: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            company_name: "",
            image: "",
        },
        userUsed:{
          user_id: null,
            role: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            company_name: "",
            image: ""
        },
        userCreated: "",
        userError: "",
        userChat: {
            name: "",
            image: "B"
        },
        allUsers: []
    },

    reducers: {
      onUserError :(state, action) => {
        // console.log("dispatch ok error")
        state.userError = "YES"
        return (
          state
      ) 
      },

      onUserRoleChoice:(state, action) => {
        state.user.role = action.payload
        return (
            state
        ) 
      },
      onUserEmailInput:(state, action) => {
        state.user.email = action.payload
        return (
            state
        )
    },
      onUserPasswordInput:(state, action) => {
        state.user.password = action.payload
        return (
            state
        )
    },
    onUserFirstNameInput:(state, action) => {
        state.user.first_name = action.payload
        return (
            state
        )
    },
      onUserLastNameInput:(state, action) => {
        state.user.last_name = action.payload
        return (
            state
        )
    },

    onUserCompanyInput:(state, action) => {
      state.user.company_name = action.payload
      return (
          state
      )
    }, 
  
  },


    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
          state.allUsers = action.payload
            return state
        },

        [postUser.fulfilled]: (state, action) => {
          // console.log(action.payload.error)
          // console.log("ok fullfilled")
          if(action.payload.error === "YES") {
            state.userCreated = "NO"
            state.userError = "YES"
            return state 
          } else {
            const newUser = action.payload.responseData
            state.allUsers = {...state.allUsers, newUser}
            state.userCreated = "YES"
            state.userError = "NO"
            return state 
          }
            
        },

        [fetchUserById.fulfilled]: (state, action) => {
          const newUserChat = action.payload;
          // state.userChat.name = action.payload.first_name
          // state.allUsers = [...state.allUsers, newUserChat]
          state.userUsed=action.payload
          
          return state
        },
    },
})

export default userSlice.reducer;
export const { onUserRoleChoice, onUserEmailInput, onUserPasswordInput, onUserFirstNameInput, onUserLastNameInput, onUserCompanyInput, onUserError} = userSlice.actions;