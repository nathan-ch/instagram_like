import React from 'react';
import { useParams } from "react-router-dom";

export const Image = () =>{
    let { id } = useParams()
    return(

        <h1>Image {id}</h1>
        
    )
}