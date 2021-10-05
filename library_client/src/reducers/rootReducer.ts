import currentUser from './currentUser'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser: currentUser
})

export default rootReducer