import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export const Profile = () =>{

    return(
        <div>
            <h1>Profile</h1>
            <Link to ="/edit_profile">Editer mon profil</Link>
        </div>
        
    )
}