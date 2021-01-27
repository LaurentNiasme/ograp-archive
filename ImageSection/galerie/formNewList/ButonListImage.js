import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {switchCheckBox} from '../../../../../store/imageSlice';
// La new list n'est pas intégré dans le projet, le code n'est pas concluant pour le moment
const ButonListImage = ({id, listImage}) => {
    const imageState = useSelector(state=>state.imageSlice)

    const [newListImage, setNewListImage] = useState([])
    
    const dispatch = useDispatch()
     
    const filterImageList = () => {
        return (
            imageState.listImageNewImage.map((Element, index)=>{
                if(Element.used){
                    return Element
                }else{
                    if(id===index){
                        let myCheckBox = {...Element, checked:!Element.checked}
                        return myCheckBox
                    } else {
                        let otherCheckBox = {...Element, checked:false}
                        return otherCheckBox
                    }
                }
            })
        )
    }
    const newArrayImageList = () => {
    //  console.log(filterImageList())   
    }
    const  checkBoxClick =  (e) => {
         e.preventDefault()
         newArrayImageList()
        }

        //  setNewListImage([])
            // imageState.listImageNewImage.forEach((actualListImage, i) => {
            //    if(actualListImage.used){
                   
            //         setNewListImage([...newListImage, {used:"jacob"}])
            //         console.log("used", newListImage)
            //    }else{
            //        if(i===id){
            //            let myCheckBox = {...actualListImage, used: !listImage.used }
            //            setNewListImage([...newListImage, myCheckBox ])
            //            console.log("my id", myCheckBox)
            //        }else{
            //            let otherCheckBox = {...actualListImage, used: false }
            //            setNewListImage([...newListImage, otherCheckBox ])
            //            console.log("other")
            //        }
            //    }
            //    if ( i === (imageState.listImageNewImage.length-1)) {
            //        console.log(newListImage)
            //    }
            // });
         


    return (
        <div className="contain-name-list-image">
            <input type="checkbox" checked={listImage.checked} onClick={checkBoxClick} disabled = {listImage.used} /> 
            {listImage.name}
        </div>


    )
}

export default ButonListImage