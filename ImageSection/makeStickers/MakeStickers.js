import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stickers from '../Stickers/Stickers';
import { setMousePosition, createSticker } from '../../../../store/imageSlice';
import {cleaningTextAndTitre} from '../../../../store/messageSlice'
import './makeStickers.css';
import ShowStickers from '../ShowStickers/ShowStickers'

const MakeStickers = () => {
  const imageState = useSelector(state => state.imageSlice);
  const messageState = useSelector(state => state.messageSlice)
    const dispatch = useDispatch()
    // le hook useRef permet de contenir les propriétés d une div dans une constante comme un document.getElementById en plus simple
    // il suffit de metre ref={la constante ref créée en amont} et s amuser avec la constante
    const imgRef = useRef(null);
    // lors du clique sur l image on lance la sauvegarde du stickers dans le reducer
    const saveStickers = (e) => {
      dispatch(cleaningTextAndTitre())
      // Calcul au clic, de la position de la souris sur l'image en pourcentage.
        const percentagePosition = {
          x:(e.nativeEvent.offsetX-8)/imgRef.current.offsetWidth,
          y:(e.nativeEvent.offsetY-7.3)/imgRef.current.offsetHeight
        }
      dispatch(createSticker(true))
      // Envoie de la position du sticker dans le state du reducer
      dispatch(setMousePosition({
        x: ((percentagePosition.x)*100).toPrecision(4),
        y: ((percentagePosition.y*100)).toPrecision(4),
      }))
    }
    return (
        <div className="main-image">
          <div className='container-stickers-image'  ref={imgRef} >
            {imageState.creatingSticker ? <Stickers stickersList={false}/> : null}
            <ShowStickers />
            <img className='image-comment'   src={imageState.imageUsed.image_url} onClick={saveStickers} onContextMenu={(e)=>e.preventDefault()} />
        </div>
       </div>
    )
}

export default MakeStickers