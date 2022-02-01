import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, LOGOUT_SUCCESS } from '../types/authType';

export const userRegister = (data) => {
    return async (dispatch) => {

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/messenger/user-register', data, config)
            localStorage.setItem("authToken", res.data.token)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: res.data.successMessage,
                    token: res.data.token
                }
            })

        } catch (error) {
            console.error("Dispatch Error", error.response.data);
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage,
                }
            })
        }
    }
}

export const userLogin = (data) => {
    return async (dispatch) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post('/api/messenger/user-login', data, config);
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {

        }
    }
}

export const userLogout = () => async (dispatch) => {
    console.log('logout')
    try {
        const response = await axios.post('/api/messenger/user-logout')
        if (response.data.successMessage) {
            localStorage.removeItem('authToken')
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: {

            }
        })
    }
}