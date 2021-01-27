import React from 'react';
import MakeImageGalerie from './makeImageGalerie/MakeImageGalerie'
import Footer from '../../Footer/Footer'
import './imageGalerie.css'


const ImageGalerie = () => {

    return (
            <div class="gallery" id="gallery">

                <MakeImageGalerie />
                {/* <Footer/> */}
            </div>

    )
}

export default ImageGalerie