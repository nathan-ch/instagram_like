import {
    GET_IMAGE_REQUEST, GET_IMAGE_SUCCESS, GET_IMAGE_FAILURE
  } from './Type';

  const initialState={
    isFetching: false,
    images : [],
  }

  function imagesReducer(state = initialState , action) {
  switch (action.type) {
    case GET_IMAGE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case GET_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: '',
        images : action.images
      })
    case GET_IMAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

export default imagesReducer
