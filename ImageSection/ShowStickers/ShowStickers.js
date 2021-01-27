import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {switchStickerSelect, fetchSticker} from '../../../../store/imageSlice';
import Stickers from '../Stickers/Stickers';
import socket from '../../../socketIo/SocketIo';




const ShowStickers = () => {
    const imageState = useSelector(state => state.imageSlice);
    const dispatch = useDispatch()
    // A chaque fois qu'on change d image, sticker utilisé devient le 1er sticker du tableau de la liste des stcikers
    // appartenant à cette image
    // cette partie du code ne fonctionne pas pour le moment
    useEffect(()=>{
        if(imageState.listStickers.map[0]){
            dispatch(switchStickerSelect(imageState.listStickers.map[0]))
        }
    },[imageState.indexCarrousel])

    const showAllStickers = () => {
        return (
            <div>
                {imageState.listStickers.map((sticker, i)=> {
                   // on récupère toutes les données d'un sticker dans la variable sticker. 
                   // on crée un objet qu'on envoie dans le props du composant sticker. Cet objet contiendra tout le state du sticker
                    const stateSticker = {
                        id: sticker.id,
                        image_id: null,
                        left:sticker.position_x + "%",
                        top:sticker.position_y + "%",
                        visible: true,
                        backgroundColor:sticker.color
                    }
                            //StickerList a true, pour dire que ce sticker appartient à la list de sticker venant de la BDD
                            //s il est a FALSE c est le sticker par default                     
                    return <Stickers  key={i+100} stickersList={true} stateStickerInObject={stateSticker} indexStickerArray={i}/>
                })}
            </div>
        )
    }
// Socket.io socket.on veut dire qu'on écoute/reçoit une information venant du message clef SendNewSticker

    useEffect(()=>{
        socket.on('SendNewSticker', (state)=>{
            dispatch(fetchSticker(state))
            })
    },[])

    return (
        <div >
            {showAllStickers()}
        </div>
    )
};

export default ShowStickers;