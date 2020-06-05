import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE
  } from './Type';
import Cookies from 'js-cookie';

  const initialState={
    isFetching: false,
    isAuthenticated: Cookies.get('userToken') ? true : false,
    userToken : Cookies.get('userToken') ? Cookies.get('userToken') : false,
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
        userToken : Cookies.get('userToken'),
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
      case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: '',
      })
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
      case DELETE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
      })
    case DELETE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        userToken : false,
        user: false,
        errorMessage: '',
      })
    case DELETE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: action.message
      })
    default:
      return state
  }
}

export default authReducer
