import React, { useEffect } from 'react';import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { getImages } from '../_Redux/_Images/Actions';
import { useDispatch, useSelector } from 'react-redux'

export const Home = (props) => {
    const images = useSelector(state => state.imagesReducer.images)
    const dispatch = useDispatch()
    
    useEffect(() =>{
        dispatch(getImages())
    },[]);

    return (
        <div>
            <h1>THPgram</h1>
            {images.map(image=>
                <img style={{maxHeight:'15em', width:'15em'}} src={image.stream}/>
            )}
            <br/>
        </div>
    )
}