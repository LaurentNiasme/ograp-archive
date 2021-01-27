import React, {useEffect} from 'react';
import NewImageUpload from '../newImageUpload/NewImageUpload';
import {useSelector, useDispatch} from 'react-redux';
import {modalIONewImage, fetchImages} from '../../../../../store/imageSlice';
import './showNewImageUpload.css';


const ShowNewImageUpload = () => {
    const imageState = useSelector(state => state.imageSlice)
    const dispatch = useDispatch()
//A chaque nouveau rendu, on récupère toutes les images upload par une request sql get
// Seulement les images venant d une liste donnée
    useEffect (()=> {
        let state
        dispatch(fetchImages(state))
    },[])
// Récupération du tableau dans le state du store de imageSlice
    const createImageUpload = () => {
        return (
            <> 
            {
                imageState.listAllImages.map(newImage => (
                    <NewImageUpload state={newImage} />
                ))
            }
            </>
        )
    }
    return (
        <div className="container-new-image-upload">
            {createImageUpload()}
        </div>
    )
}

export default ShowNewImageUpload