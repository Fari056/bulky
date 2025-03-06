import { ACCOUNTTYPE, BOOKINGS, LOGIN, LOGOUT, SIGNUP, ADD_REVIEW, REQUEST_DATA } from '../types/index'

export const signin = payload => {
    return {
        type: LOGIN,
        payload: payload
    }
};
export const logout = () => {
    return {
        type: LOGOUT,
        payload: { uid: '' }
    }
};
export const signup = payload => {
    return {
        type: SIGNUP,
        payload: payload
    }
}
export const set_account_type = payload => {
    return {
        type: ACCOUNTTYPE,
        payload: payload
    }
}
export const set_bookings = payload => {
    return {
        type: BOOKINGS,
        payload: payload
    }
}
export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    };
};
export const setRequestData = (data) => {
    return {
        type: REQUEST_DATA,
        payload: data,
    };
};


