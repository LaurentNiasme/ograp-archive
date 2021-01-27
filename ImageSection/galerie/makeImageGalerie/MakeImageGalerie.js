import React, {useEffect} from 'react';
import SlotImageGalerie from '../SlotImageGalerie/SlotImageGalerie';
import {useSelector, useDispatch} from 'react-redux';
import '../imageGalerie.css'

const MakeImageGalerie = () => {
    const imageState = useSelector(state => state.imageSlice)
    const createImage = () => {
// Dans le return on utilise un map pour voir toutes les clefs d'un tableau et faire une action dessus
// ici on affiche le component SlotImageGalerie en lui injectant dans une props l url de l image
        return (
            <>
                {
                    imageState.listAllImages.map(image => {
                        return(
                            <SlotImageGalerie image={image} />
                        )
                    })
                }
            </>
        )
    }

    return (
        <div className="containeImageGalerie"> 
            {createImage()}
        </div>
    )
}

export default MakeImageGalerie