import React from 'react'
import './colorPicker.css'
import {setColorSticker} from'../../../../../store/imageSlice'
import {CirclePicker} from 'react-color'
import { useDispatch } from 'react-redux'

const ColorPicker = () => {
    const dispatch = useDispatch()
    const color = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
    return (
        <div className="circle-picker-div">
            <CirclePicker className="circle-picker" circleSize={21} width={"auto"} colors={color} onChange={color => dispatch(setColorSticker(color.hex))}/>
        </div>
    )
}

export default ColorPicker;