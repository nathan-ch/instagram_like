import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { deleteUser } from '../_Redux/_Authentication/Actions'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

export const EditProfile = () => {

    const dispatch = useDispatch()
    const userToken = useSelector(state => state.authReducer.userToken)

    const deleteAccount = () => {
        dispatch(deleteUser(userToken))
    }

    return (
    <div>
        <h1>EditProfile</h1>
        <Button onClick={deleteAccount} variant="danger">Supprimer mon compte</Button> 
    </div>
    )
}