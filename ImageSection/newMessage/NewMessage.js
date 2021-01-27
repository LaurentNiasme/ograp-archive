import React, {useState, useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import {useSelector, useDispatch} from 'react-redux';

import { IOModalFirstMessage, createTitleMessage, onMessageInput,sendingNewComment,
         sendMessage, validateTitleMessage, fetchCommentList ,postcommentList ,
         fetchComment, postcomment} from '../../../../store/messageSlice';

import {createSticker, fillListStickers, postStickers} from '../../../../store/imageSlice';
import MakeStickers from '../makeStickers/MakeStickers';
import ColorPicker from './ColorPicker/ColorPicker';
import store from './../../../../store';
import TextField from "@material-ui/core/TextField";

import './NewMessage.css'


const NewMessage = () => {
    const message = useSelector(state => state.messageSlice)
  
    const imageState = useSelector(state=>state.imageSlice)

    const dispatch= useDispatch()


    const [rowTextArea, setRowTextArea] = useState(1)
    const states = store.getState()

    // fermer la modal new message en dispatchant dans le reducer messageSlice le sate IOModal à false
    const handleModalClose = (e) =>{
        dispatch(onMessageInput(""))
        dispatch(createTitleMessage(""))
        dispatch(IOModalFirstMessage(false))
        };

    // récupérer la valeur du titre du message qui est en train d"être tappée
    const handleTitleMessage = (e) =>{
        e.preventDefault()
        const title = e.target.value
        dispatch(createTitleMessage(
            title
        ))
     }

     // récupérer la valeur du message qui est entré dans le input text du message. Le row s aggrandit lorsqu'on écrit jusqu'à
     //une valeur max
    const handleMessageText= (e) =>{
        e.preventDefault()
        const text = e.target.value
        // console.log(e.target.scrollHeight, "scroll height")
        const rowsActual = parseInt(e.target.scrollHeight/30)
        //console.log(rowsActual, e.target.scrollHeight)

        if(rowsActual>=4){
            setRowTextArea(4)
        }else{
            setRowTextArea(rowsActual)
        }
        dispatch(onMessageInput(
            text
        ))
     }

     // valider le message en modifiant le state du sliceMessage et en fermant la modal
     const handleSubmitFirstMessage = (e) => {
        e.preventDefault()
        if (message.messageText && message.titreMessage){
            dispatch(sendingNewComment(true))
            // on dit qu'on n utilise plus le sticker par default on utilisera le state qu'on créera pour le sticker qui sera
            // lié à l image
            dispatch(createSticker(false))
            // on post le sticker 
            dispatch(postStickers(states))
        }else{
            if(message.messageText){
            }
            if (message.newTitreMessage){

            }
        }
    }
// on regarde si le sticker used id a changé par l effet d un click sur un nouveau sticker.
// si oui le useEffect s active  on lance l action postcommentList si le message.sendingNewComment est rempli
    useEffect(()=>{
       if(message.sendingNewComment){
           dispatch(postcommentList(states))
        }
    },[imageState.stickerUsed.id])
// Pareil pour le post du commentaire. Puis on dit que l action de poster un nouveau commentaire est fini en mettant le 
// dans l action sendingNewComment l argument à false

    useEffect(()=>{
        if(message.sendingNewComment) {
            dispatch(postcomment(states))
            dispatch(sendingNewComment(false))
        }
    },[message.commentListUsed.id])



    return (
        <div>

            <Modal 
            show={message.modalIOFirstMessage} 
            onHide={handleModalClose} 
            className='modal-newMessage'size='xl'
            >
                    <Modal.Header>Créer un message</Modal.Header>
                         <div className="colorPicker-Container">
                            <p className="p-color">  Choisissez une couleur de sticker  et sélectionnez un point sur l'image </p>

                    <ColorPicker />
                        </div>
                    <Modal.Body className='modal-newMessage-body'>
                    <MakeStickers/>
                    <Form onSubmit={handleSubmitFirstMessage} className='modal-form-new-message'>
                        <Form.Group className="modal-input-container">
                        <TextField  className="modal-input" onChange= {handleTitleMessage} value={message.titreMessage} label="Titre du message" variant="outlined" />
                        <TextField  className="modal-input" onChange= {handleMessageText} value={message.messageText} label="Message" variant="outlined" />
                        </Form.Group>

                        <Button className="send-button-modal" variant="primary" type="submit">
                        Envoyer
                        </Button>
                        <Button  className="close-button-modal" onClick={handleModalClose} variant="primary">
                            Close Modal
                        </Button>
                    </Form>
                    </Modal.Body>

            </Modal>
        </div>
            )

        }

export default NewMessage;