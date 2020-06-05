import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './_Authentication/Reducer'
import imagesReducer from './_Images/Reducer'

const rootReducer = combineReducers({
  authReducer : authReducer,
  imagesReducer : imagesReducer
})

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())    
  )
