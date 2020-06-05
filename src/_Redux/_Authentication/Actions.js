import { LOGIN_REQUEST } from './Type'
import { LOGIN_SUCCESS } from './Type'
import { LOGIN_FAILURE } from './Type'

import { LOGOUT_SUCCESS } from './Type'

import { REGISTER_REQUEST } from './Type'
import { REGISTER_SUCCESS } from './Type'
import { REGISTER_FAILURE } from './Type'

import { DELETE_REQUEST } from './Type'
import { DELETE_SUCCESS } from './Type'
import { DELETE_FAILURE } from './Type'

import Cookies from 'js-cookie';
// Actions for Login
export const requestLogin = (identifier, password) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    identifier,
    password
  }
}

export const receiveLogin = (result) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    userToken: result.token,
    user: result.user
  }
}

export const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const loginUser = (identifier, password) => {

  const body = {
    "user":
    {
      "email": identifier,
      "password": password
    }
  }

  return dispatch => {
    dispatch(requestLogin(identifier, password))
    return fetch('http://localhost:8080/users/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    )
      .then(response => response.json().then(user => ({
        token: response.headers.get("authorization"),
        user
      })))
      .then((result) => {
        console.log(result);
        if (result.token == null) {
          alert('mot de passe ou email incorrect')
          dispatch(loginError(result.user))
          return Promise.reject(result.user)
        } else {
          Cookies.set('userToken', result.token)
          Cookies.set('user', result.user)
          dispatch(receiveLogin(result))
          console.log("User Loged");
        }
      }).catch(err => console.log("Error: ", err))
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isAuthenticated: false,
    userToken: false,
    user: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(receiveLogout())
  }
}

// Actions for Register
export const requestRegister = (username, email, password) => {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    username,
    email,
    password
  }
}

export const receiveRegister = (user) => {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
  }
}

export const registerError = (message) => {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const registerUser = (username, email, password) => {

  const body = {
    "user":
    {
      "email": email,
      "password": password,
      "username": username
    }
  }

  return dispatch => {
    dispatch(requestRegister(username, email, password))
    return fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    )
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        if (result.id == null) {
          alert("L'email ou le username est deja utilisé. Veuillez réessayer")
          dispatch(loginError(result))
          return Promise.reject(result)
        } else {
          dispatch(receiveRegister(result))
          console.log("User registered");
          dispatch(loginUser(email, password))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Actions for Delete
export const requestDelete = (userToken) => {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    userToken
  }
}

export const receiveDelete = () => {
  return {
    type: DELETE_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    userToken: false,
    user: false,
  }
}

export const deleteError = (message) => {
  return {
    type: DELETE_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    message
  }
}

export const deleteUser = (userToken) => {

  return dispatch => {
    dispatch(requestDelete(userToken))
    return fetch('http://localhost:8080/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': userToken
      },
    }
    )
      .then((response) => {
        console.log(response);
          dispatch(receiveDelete())
          alert("Le compte a été supprimé")
          console.log("User deleted");
      }).catch(err => console.log("Error: ", err))
  }
}