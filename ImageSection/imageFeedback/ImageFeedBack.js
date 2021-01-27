import React from 'react';
import ShowImage from './ShowImage'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";
import CreateShowImage from './CreateShowImage'
import {useSelector} from 'react-redux'
import './imageFeedBack.css'

const ImageFeedBack = () => {

  const imageState = useSelector(state =>state.imageSlice);
  const lengthCarrousel = imageState.listAllImages.length;
  const imageListUsed = imageState.listAllImages.findIndex(image => image.id===imageState.imageUsed.id);
    return (
        <div className="main-image-FeedBack">
{/* fonctionnalité du carroussel */}
          <MDBCarousel
            activeItem={imageListUsed+1}
            length={lengthCarrousel}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
            interval={false}
          >
            <MDBCarouselInner >
              <div className="inner-carrousel">
              < CreateShowImage />
              </div>
            </MDBCarouselInner>
          </MDBCarousel>

        </div>
    )
}

export default ImageFeedBack;








