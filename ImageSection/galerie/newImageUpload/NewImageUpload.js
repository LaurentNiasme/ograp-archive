import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './newImageUpload.css'

import {useSelector, useDispatch} from 'react-redux';
import {modalIONewImage, uploadImage, postImage, newImageUpload, modalIONewList} from '../../../../../store/imageSlice';

const NewImageUpload = ({state}) => {
    const dispatch = useDispatch()

    // on ferme la modal de l image list en dispatchant l action dans le slice imageSlice
    //Dans la version 0 l imageList n'est pas fonctionnel meme si la modal marche
    const handleModalClose = () => {
        dispatch(modalIONewList(true))
    }
    return (
        <div className="vignette-image-upload">
            <div className='contain-image'> 
                <img className='image-upload' src={state.image_url}/>
            </div>
            <Button  className="close-button" onClick={handleModalClose} variant="primary">
                                liste de l'image
            </Button>
        </div>
    )
}

export default NewImageUpload