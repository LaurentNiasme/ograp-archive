import React, {useEffect, useRef} from 'react';
import './stickers.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchSticker, switchStickerSelect} from '../../../../store/imageSlice';
import {fetchCommentList, fetchComment} from '../../../../store/messageSlice';


import store from './../../../../store';




const Stickers = ({stickersList, stateStickerInObject, keyId}) => {
    // const states = store.getState()
    const stickerRef = useRef(null);
    const imageState = useSelector(state => state.imageSlice);
    const messageState = useSelector(state => state.messageSlice)
    const dispatch = useDispatch()
// Le state du sticker par default. Ce sticker nous sert de patron pour savoir où et de quelle couleur sera le sticker final
    const defaultStateSticker = {
        top: imageState.sticker.y +"%",
        left: imageState.sticker.x +"%",
        backgroundColor: imageState.sticker.stickerColor
    }
// si on selectionne le sticker qui vient de la liste des stickers de l image Slice en asyncrhone on 
// dit que ce sticker est le nouveau sticker sélectionné. Puis on affiche la nouvelle liste de commentaires
    const selectSticker = async (e) => {
        e.preventDefault()
      
        if (stateStickerInObject){
            let states
           await dispatch(switchStickerSelect({
                id: stateStickerInObject.id,
                image_id: stateStickerInObject.image_id,
                position_x: stateStickerInObject.left,
                position_y: stateStickerInObject.top,
                visible: true,
                stickerColor: stateStickerInObject.backgroundColor
            }))
           await dispatch(fetchCommentList(states))
            dispatch(fetchComment(states))
        }
    }

    const overSticker = (e) => {
        e.preventDefault()
        // dipatch(overSticker())
       
    }

    return (
        // on regarde si on a le sticker par défault ou venant du state de l image slice pour savoir quel style on lui donne
        <div className="stickers"  key={keyId} ref= {stickerRef} style={stickersList ? stateStickerInObject : defaultStateSticker } onMouseOver={overSticker} onClick={selectSticker}>

        </div>
    )
};
export default Stickers;