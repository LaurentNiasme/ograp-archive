import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {galerieIO, switchImageUsed} from '../../../../../store/imageSlice';
import '../imageGalerie.css';

const SlotImageGalerie = ({image}) => {

    const dispatch = useDispatch()

    // Lorsqu'on selectionne l image qui est dans la galerie, on envoie dans le state que c'est cette image qu'on utilise
    // on lui envoie donc toutes ces données grace au props image
    const selectImage = (e) => {
        e.preventDefault()
        // console.log(image)
        dispatch(switchImageUsed(image))
        dispatch(galerieIO(false))

    }
    return (
        <>
            <div class="slotImageGalerie mb-3 pics animation all 2">
                <img className="img-fluid" src={image.image_url} alt="Card image cap" onClick={selectImage}/>
            </div>


        </>
    )
}

export default SlotImageGalerie