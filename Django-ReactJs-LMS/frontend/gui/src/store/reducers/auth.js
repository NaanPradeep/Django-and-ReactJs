import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialstate = {
    token: null,
    userID: null,
    email: null,
    userName: null,
    is_staff: null,
    date_of_birth: null,
    error: null,
    loading: null
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.user.token,
        userID: action.user.userID,
        email: action.user.emailID,
        userName: action.user.userName,
        date_of_birth: action.user.date_of_birth,
        is_staff: action.user.is_staff,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return  updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, initialstate)
}


const reducer = (state=initialstate, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
