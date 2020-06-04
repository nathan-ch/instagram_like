import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export const Home = () => {

    return (
        <div>
            <h1>THPgram</h1>
            <Link to={'image/1'}>image1</Link>
        </div>
    )
}