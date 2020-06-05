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
      images: [],
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
      .then((response) => {
        if (response.length < 1) {
          alert('problème de chargement des images')
          dispatch(getImageError(response))
        } else {
          let array = []
          for (let i = 0; i < response.length; i++) {
            let data = {}
            const image = response[i];
            data['description'] = image.description
            data['id'] = image.id
            data['extension'] = image.extension
            data['stream'] = image.stream
            data['userId'] = image.user_id
            data['date'] = image.created_at
            array.push(data)
          }
          dispatch(receiveGetImage(array))
          console.log("images downloaded");
        }
      }).catch(err => console.log("Error: ", err))
  }
}