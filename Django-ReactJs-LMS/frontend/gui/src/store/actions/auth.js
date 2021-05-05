import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000);
    };
  };

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            email: email,
            password: password
        })
        .then(res => {
            const user = {
                token: res.data.token,
                userID: res.data.user.id,
                emailID: res.data.user.email,
                userName: res.data.user.username,
                date_of_birth: res.data.user.date_of_birth,
                is_staff: res.data.user.is_staff,
                expirationTime: new Date(new Date().getTime() + 7200 * 1000)
            }
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(user));
            // dispatch(checkAuthTimeout(7200))
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
}

export const authRegister = (username, email, date, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            date_of_birth: date,
        })
        .then(res => {
            const user = {
                token: res.data.token,
                userID: res.data.user.id,
                userName: res.data.user.username,
                emailID: res.data.user.email,
                date_of_birth: res.data.user.date_of_birth,
                is_staff: res.data.user.is_staff,
                expirationTime: new Date(new Date().getTime() + 7200 * 1000)
            }
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(user));
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user === undefined | user === null) {
            dispatch(logout());
        } 
        else {
            dispatch(authSuccess(user));   
        }
    }
}