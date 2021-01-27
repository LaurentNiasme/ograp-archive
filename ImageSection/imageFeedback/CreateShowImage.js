import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";
import {useSelector, useDispatch} from 'react-redux';
import {fetchSticker} from '../../../../store/imageSlice'
import ShowImage from './ShowImage';

const CreateShowImage = () => {
  const imageState = useSelector(state => state.imageSlice)
  const dispatch = useDispatch()

        const makeShowImage = () => {
        //  Affichage du carroussel Mdb
            return (
              <>
                  {
                    imageState.listAllImages.map((state, index)=> {
                     
                    return (
                        <MDBCarouselItem itemId={index+1}  >
                            <MDBView>
                              <ShowImage state={state} indexCarrousel={index+1}/>
                            </MDBView>
                        </MDBCarouselItem>
                    )
                    })
                  }
              </>
            )
        }

    return (
        <div> 
            {makeShowImage()}
        </div>
    )
};

export default CreateShowImage