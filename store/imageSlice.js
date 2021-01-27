import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
require('dotenv').config();

const urlServer = process.env.REACT_APP_URL_SERVER;

export const fetchSticker = createAsyncThunk(
    'imageSlice/fetchAllSticker',
    async(state,{getState}) => {
        const {imageUsed} = getState().imageSlice
        const response = await axios.get(`${urlServer}/findstickers/${imageUsed.id}`, 
                                        {headers: {authtoken:localStorage.getItem("userToken")}})
        return response.data
    }
)

//import store from './index'
// pour faire une requête vers la l'api/ le back
//utiliser la fonction createAsyncThunk() et l'appeler depuis redux toolkit
export const postStickers = createAsyncThunk(
    'imageSlice/postStickers',
    async(states,{getState}) => {
         const { imageUsed, sticker } = getState().imageSlice
        const response = await axios.post(`${urlServer}/createnewsticker`, 
                                                                { "image_id": imageUsed.id, 
                                                                "position_x": sticker.x, 
                                                                "position_y": sticker.y, 
                                                                "color":sticker.stickerColor }, 
                                            {headers: {authtoken:localStorage.getItem("userToken")}})
        return response.data
    }
)


// ------------------------------------------------ Section creation liste image ---------------------------
// get une list d images selon le feedBack utilisé
export const fetchListImage = createAsyncThunk(
    'imageSlice/fetchAllListImage',
    async({getState}) => {
       
        
        const {feedBackUsed} = getState().feedBackSlice
        const response = await axios.get(`${urlServer}/imageListByFeedbackId/${feedBackUsed.id}`, {headers: {authtoken:localStorage.getItem("userToken")}})
        return response.data
    }
)

// post une liste d image
export const postListImage = createAsyncThunk(
    'imageSlice/postListImage',

    async({getState}) => {

       
        const {newNameListImage}= getState().imageSlice
        const {feedBackUsed} = getState().feedBackSlice
        const response = await axios.post(`${urlServer}/newImageList`, {
                                                                                "feedback_id": feedBackUsed.id,
                                                                                "name": newNameListImage
                                                                            }, {headers: {authtoken:localStorage.getItem("userToken")}}
                                                                            )
        
        return response.data
    }
)
// ------------------------------------------------ Section creation image ---------------------------
// get les images appartenant à une liste d image
export const fetchImages = createAsyncThunk(
    'imageSlice/fetchAllImage',
    async(state ,{getState}) => {
        // console.log("list image used")
       
        const {listImageUsed}= getState().imageSlice
        const response = await axios.get(`${urlServer}/imageByListImageId/${listImageUsed.id}`, {headers: {authtoken:localStorage.getItem("userToken")}} )
        return response.data
    }
)


// post upload l image dans le serveur pour recevoir une url
export const uploadImage = createAsyncThunk(
    'imageSlice/uploadImage',

    async(formData) => { 
        const response = await axios.post(`${urlServer}/uploadImage`,formData, { headers: {'Content-Type': 'multipart/form-data'} }, {headers: {authtoken:localStorage.getItem("userToken")}})
        return response.data
    }
)

// post une image avec l url obtenue
export const postImage = createAsyncThunk(
    'imageSlice/postImage',
    async(state, {getState}) => {
        const {newImage}= getState().imageSlice
        const response = await axios.post(`${urlServer}/newImage`, 
        {
            "image_url": newImage.image_url,
            "list_image_id": 3,
            "default_height": 1,
            "default_width": 1
            }, {headers: {authtoken:localStorage.getItem("userToken")}})                                                                                                                                     
        return response.data
    }
)


const imageSlice = createSlice({
    name: 'Image',
    initialState: {
        imageId: 1,
        width: "",
        height: "",
        stickerUsed: {
            id: null,
            image_id: null,
            position_x: "",
            position_y: "",
            visible: true,
            stickerColor: ""
        },
        imageUsed: {
            image_url: "",
            list_image_id: null,
            default_height: null,
            default_width: null,
            id:null

        },
        newImage: {
            image_url: "",
            list_image_id: 3,
            default_height: 1,
            default_width: 1,
        },
        newImageUpload: {
            data:null,
            imageFromServer:false
            
        },
        listImageUsed : {
            feedback_id: 4,
            name: "",
            id:3
         },
         newNameListImage:"",
         
        sticker: {
            stickerColor: "",
            x: null,
            y: null,
                    },
        galerieIO:true,
        indexCarrousel:null,
        listNewImageUpload:[],
        listImageNewImage: [{checked:true,used:true, name:"jokari"},{checked:false,used:false, name:"jokarmarceli"}, {checked:false,used:false, name:"lucettetos"}],
        modalIONewImage: false,
        modalIONewList:false,
        creatingSticker: false,
        AllListProject:[],
        listStickers: [],
        listImages:[],
        listAllImages:[]
    },
    reducers: {
        setMousePosition: (state, action) => {
            state.sticker = {...state.sticker,
                x: action.payload.x,
                y: action.payload.y
            };
            state.stickerUsed = "";
            return (
                state
            )
        },

        getSizeImage: (state, action) => {
            // console.log(action.payload)
            state.width = action.payload.widthImage;
            state.height = action.payload.heightImage;
            return (
                state
            )
        },
        
        createSticker: (state, action) => {
            state.creatingSticker = action.payload
            return (
                state
            )
        },
        setColorSticker: (state, action) => {
            state.sticker.stickerColor = action.payload
            return (state)
        },
        fillListStickers: (state, action) => {

            state.listStickers = [...state.listStickers, state.sticker]
            return (
                state
            )
        },
        switchStickerSelect: (state, action) => {
            // console.log(action.payload)
            state.stickerUsed= action.payload
            return state
        },
        modalIONewImage : (state, action)=> {
            state.modalIONewImage = action.payload;
            return (
                state
            )
        },
        modalIONewList : (state, action)=> {
            state.modalIONewList = action.payload;
            return (
                state
            )
        },
        galerieIO : (state, action)=> {
            state.galerieIO = action.payload;
            return (
                state
            )
        },
        switchCheckBox : (state, action)=> {
            
            
            return (
                state
            )
        },
        // remplir l array des nouvelles images qu'on upload du disque dure local
        newImageUpload : (state, action) => {
            state.newImageUpload = {...action.payload}
            state.listNewImageUpload = [...state.listNewImageUpload, action.payload]
            return (
                state
            )
        },
        switchImageUsed : (state, action) => {
            state.imageUsed = action.payload
            return state
        },
        switchImageCarrousel : (state, action) => {
            state.indexCarrousel = action.payload;
            return state
        }
    },
    extraReducers : {
        // ----------------------------- post and get stickers -------------------------
        [fetchSticker.fulfilled] : (state, action) => {
            state.listStickers = []
            state.listStickers = action.payload
        },

        [postStickers.fulfilled] : (state, action) => {
            const newStateSticker = action.payload
            state.stickerUsed= newStateSticker
            state.listStickers = [...state.listStickers, newStateSticker]
            return state
        },
        // -------------------------------- post and get liste image --------------------------
        [fetchListImage.fulfilled] : (state, action) => {

            state.listImages = action.payload

        },

        [postListImage.fulfilled] : (state, action) => {
            const newListImage = action.payload
            state.listImageUsed= newListImage
            state.listImages = [...state.listImages, newListImage]
            return state
        },
         // -------------------------------- post and get upload image --------------------------
         [fetchImages.fulfilled] : (state, action) => {

            state.listAllImages = action.payload

        },
        // Après avoir uploade l image dans le dossier public du server, on met dans le state l addresse url
        // de l image qui vient d etre uploade
        [uploadImage.fulfilled] : (state, action) => {
            state.newImage.image_url = action.payload.image_url;
            state.newImage.list_image_id = state.listImageUsed.id
            return state
        },
        [postImage.fulfilled] : (state, action) => {
            state.listAllImages = [...state.listAllImages, action.payload]
            return state
        }
    },
})

export const { setMousePosition, createSticker, fillListStickers, setColorSticker, switchStickerSelect, modalIONewImage, newImageUpload, modalIONewList, switchCheckBox,galerieIO, switchImageUsed, switchImageCarrousel, getSizeImage} = imageSlice.actions;
export default imageSlice.reducer;