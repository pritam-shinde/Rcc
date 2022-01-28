import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authType";
import deCodeToken from 'jwt-decode'

const authState = {
    loading: true,
    authenticate: false,
    error: "",
    successMessage: "",
    myInfo:""
}

const tokenDecode = (token) =>{

}

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    if (type === REGISTER_FAIL) {
        return {
            ...state,
            error: payload.error
        }
    }

    if (type === REGISTER_SUCCESS) {
        return {
            ...state,
            success: payload.successMessage
        }
    }

    return state;
}