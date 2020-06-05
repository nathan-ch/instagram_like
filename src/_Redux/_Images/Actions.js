import { GET_IMAGE_REQUEST } from './Type'
import { GET_IMAGE_SUCCESS } from './Type'
import { GET_IMAGE_FAILURE } from './Type'

// Actions for Images
export const requestGetImage = () => {
    return {
      type: GET_IMAGE_REQUEST,
      isFetching: true,
    }
  }
  
  export const receiveGetImage = (images) => {
    return {
      type: GET_IMAGE_SUCCESS,
      isFetching: false,
      images: images
    }
  }
  
  export const getImageError = (message) => {
    return {
      type: GET_IMAGE_FAILURE,
      isFetching: false,
      images: false,
      message
    }
  }
  
  export const getImages = () => {
  
    return dispatch => {
      dispatch(requestGetImage())
      return fetch('http://localhost:8080/api/v1/images', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        if (result.id == null) {
          alert("L'email ou le username est deja utilisé. Veuillez réessayer")
          dispatch(getImageError(result))
          return Promise.reject(result)
        } else {
          dispatch(receiveGetImage(result))
          console.log("images downloaded");
        }
      }).catch(err => console.log("Error: ", err))
  }
}