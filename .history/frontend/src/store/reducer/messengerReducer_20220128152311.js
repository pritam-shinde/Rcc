import { FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, IMAGE_MESSAGE_SEND, UPDATE_FRIEND_MESSAGE } from "../types/messengerType";
const messengerState = {
    friends: [],
    message: [],
    messageSendSuccess: false
}

export const messengerReducer = (state = messengerState, action) => {
    const { type, payload } = action;

    if (type === FRIENDS_GET_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    if (type === MESSAGE_GET_SUCCESS) {
        return {
            ...state,
            message: payload.message
        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            messageSendSuccess: true,
            message: [...state.message, payload.message]
        }
    }

    if (type === IMAGE_MESSAGE_SEND) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    } 

    if(type === "SOCKET_MESSAGE"){
        return{
            ...state,
            message:[...state.message, payload.message]
        }
    }

    if(type === UPDATE_FRIEND_MESSAGE){
        const index = state.friends.findIndex(f=> f.friendInfo._id === payload.msgInfo.receiverId || f.friendInfo._id === payload.msgInfo.sen)
    }

    return state
}