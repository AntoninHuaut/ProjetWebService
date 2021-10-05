import { User } from "../types/login"

const currentUser = (state = {}, action: any) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default:
            return {
                ...state,
                user: {},
                loggedIn: false
            }
    }
}

export default currentUser;