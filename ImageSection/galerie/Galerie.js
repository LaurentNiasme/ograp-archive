import React, {useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import ImageGalerie from './ImageGalerie';
import {useSelector, useDispatch} from 'react-redux';
import {modalIONewImage, fetchImages} from '../../../../store/imageSlice';
import FormNewImage from './formNewImage/FormNewImage';


const Galerie = () => {
    const dispatch = useDispatch()

    //Dans le slice ImageSlice, on change de state modaliIonNewImage en true pour ouvrir la modal

    const handleIONewImage = () => {
        dispatch(modalIONewImage(true))
    };

    //A chaque nouveau rendu on récupère toutes les images d une liste d images pour les afficher dans la 
    //galerie principale

    useEffect (()=> {
        let state
        dispatch(fetchImages(state))
        
    },[])

    return (
        <div className="galerie-section">
            <div className="header-galerie-section">
            <Button  onClick={handleIONewImage} className="my-btn-primary" variant="primary">
                ajouter une image
            </Button>
            </div>
            {/* Component de la galerie principale sur la page project */}
           <ImageGalerie />
           {/* Formulaire pour ajouter une nouvelle image en format modal */}
           <FormNewImage />
          
        </div>
    )
}

export default Galerie