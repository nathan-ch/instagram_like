import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
  } from './Type';
import Cookies from 'js-cookie';

  const initialState={
    isFetching: false,
    isAuthenticated: Cookies.get('id_token') ? true : false,
    userToken : Cookies.get('id_token') ? Cookies.get('id_token') : false,
    user : Cookies.get('user') ? Cookies.get('user') : false

  }

  function authReducer(state = initialState , action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        userToken : Cookies.get('id_token'),
        user : Cookies.get('user')
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        userToken : false,
        user : false,
      })
    default:
      return state
  }
}

export default authReducer
