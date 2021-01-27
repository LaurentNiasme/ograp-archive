import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from 'react-redux';
import {modalIONewImage, uploadImage, postImage, newImageUpload} from '../../../../../store/imageSlice';
import ShowNewImageUpload from '../showNewImageUpload/ShowNewImageUpload'
import FormNewList from '../formNewList/FormNewList'
import './formNewImage.css'

const FormNewImage = () => {
    // on se connecte au store pour récupérer les datas dans imageSlice
    const imageState = useSelector(state=>state.imageSlice)
    const dispatch = useDispatch()
    const [fileImage, setFileImage] = useState([])

    // fonction pour fermer la modal en mettant une propriété dans le state de imageSlice à False, modalioNewImage est l'action pour le faire.
    const handleModalClose = (e) => {
        e.preventDefault();
        dispatch(modalIONewImage(false))
    }

    const handleSubmitNewImage = () => {

    }

    // Après avoir selectionner l image sur son disque dur, on récupère les files dans le target de l input puis on l envoie
    // dans la fonction loadImage()
    const makeUploadImage = async (e) => {
        const files = e.target.files;
        loadImage(files[0])
      }
    const loadImage =  async (file)  => {
            let state
            // on crée un FormData
            const formData = new FormData();
            //  on lui donne l image
            formData.append('file',file)

            // L'image est d abord envoyée dans le dossier public du serveur en back. Le back crée un nom d'image
            //renvoie une URL. Cette URL on la récupère dans la response du post puis on n envoie que l url dans 
            //la BDD postgres
            
            // dispatch dans le post upload image dans le server
            await dispatch(uploadImage(formData))
            
            // dispatch dans le post de la base de donnée
            await dispatch(postImage(state))

            //Après avoir sélectionné l image sur le dd, on l envoie dans un reader pour la décoder et la rendre visible
            
            let reader = new FileReader()
            // reader.readAsDataURL(file)
            reader.readAsDataURL(file)
          // On attend que l image se load puis dans le onload on la dispatch dans un tableau
            reader.onload = ()=>{
                let dataImage = reader.result;
                //dispatch la preview dansla modal newiImages
                dispatch(newImageUpload({
                    data:dataImage,
                    imageFromServer:false
                }))
        }
    }

    useEffect(()=> {
    },[imageState.newImage.image_url])

    return(
        <div className="container-modal">
            <Modal show={imageState.modalIONewImage}  className='modal-newMessage ' size='xl'>
                    <Modal.Header>Nouvelles images</Modal.Header>   
                    <Modal.Body className='modal-new-image-body '>
                        <div className="bar-buton-new-image-upload"> 
                            <input type="file" multiple name="file" onChange={makeUploadImage}/>
                            <Button  className="close-valide-button" onClick={handleModalClose} variant="primary">
                                Valider et fermer
                            </Button>
                            <Button  className="close-button" onClick={handleModalClose} variant="primary">
                                Fermer
                            </Button>
                        </div>
                        <ShowNewImageUpload />
                    </Modal.Body>
            </Modal>
            <FormNewList />
        </div>
    )
}

export default FormNewImage;