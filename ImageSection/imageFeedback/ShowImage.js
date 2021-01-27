import React, {useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowStickers from '../ShowStickers/ShowStickers';
import {switchImageUsed, fetchSticker, switchImageCarrousel, getSizeImage} from '../../../../store/imageSlice'
import socket from '../../../socketIo/SocketIo';



const ShowImage = ({state, indexCarrousel}) => {
  //  Avec le hook de react useRef, on va l utiliser sur la div de l image pour recevoir les propriétés de la div
  const refMainPicture= useRef(null)
  //.closest('caroussel-item')
  const dispatch = useDispatch()
  const imageState = useSelector(state=>state.imageSlice)
 

  // 1er useEffect à chaque rendu la div refMainPicture on va dans son current node pour aller chercher 
  // dans le parent du parent de la div si elle est active.
  //Si elle est active dans imageSlice on dit qu'une nouvelle image est vue dans le carrousel en injectant l index du carroussel
  useEffect (()=> {
    
    if (refMainPicture.current.parentNode.parentNode.className==="carousel-item active"){

      dispatch(switchImageCarrousel(indexCarrousel))
    }
  })

// 
  useEffect (()=>{
    if (refMainPicture.current.parentNode.parentNode.className==="carousel-item active"){
      
      
      // console.log(refMainPicture.current.offsetHeight, refMainPicture.current.offsetWidth)
      // Avoir la hauteur et largeur de l image pour la rendre responsive
      dispatch(getSizeImage({widthImage : refMainPicture.current.offsetWidth,
                             heightImage : refMainPicture.current.offsetHeight}))

      dispatch(switchImageUsed(state))
    }
  },[imageState.indexCarrousel])

  // Si l id de l image utilisée est égale a l id du props state, on fait un get sur la list des sticker de l image
  useEffect(()=> {
    if (imageState.imageUsed.id===state.id){
       dispatch(fetchSticker(state))
    }
  },[imageState.imageUsed.id])



  // useEffect(()=> {

  //   const img = new Image();
  //   img.onload = function() {
  //   console.log(this.width + 'x' + this.height);
  //   return {
  //     widthImage : this.width,
  //     heightImage : this.height
  //   }
  // }

  //   img.src = state.image_url

  //   dispatch(getSizeImage(img.onload()))
    
  // },[imageState.imageUsed.image_url])

  const controlSize = () => {
    if (imageState.height > 660){
      return true
    }

  }

    return (
//  la constante refMainPicture créée en amont en hook useRef est liée à la div main-picture
// de ce fait, on peut aller voir les données de la div dans une fonction
        <div className="main-picture" ref={refMainPicture}>
          <div className='container-stickers-picture' >
            {imageState.imageUsed.id===state.id ? <ShowStickers /> : null}
            {/* <img class={controlSize() ? 'picture-portrait' : 'self-picture'} src={state.image_url} /> */}
            <img className='imageCarrousel' src={state.image_url} />

        </div>
       </div>
    )
};

export default ShowImage;