import axios from 'axios';
import * as actionTypes from './actionTypes';


export const getAssignListStart = () => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_START
    }
}


export const getAssignListSuccess = (assignments) => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_SUCCESS,
        assignments
    }
}


export const getAssignListFailed = (error) => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_FAIL,
        error,
    }
}


export const getAssignmentsList = (token) => {
    return dispatch => {
        dispatch(getAssignListStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.get('http://127.0.0.1:8000/assesments/')
            .then(res => {
                const assignments = res.data
                console.log(assignments)
                dispatch(getAssignListSuccess(assignments))
            })
            .catch(error => {
                dispatch(getAssignListFailed(error))
            })
    }
}


export const getAssignmentStart = () => {
    return {
        type: actionTypes.GET_ASSIGNMENT_START
    }
}

export const getAssignmentSuccess = (assignment) => {
    return {
        type: actionTypes.GET_ASSIGNMENT_SUCCESS,
        assignment
    }
}

export const getAssignmentFailed = (error) => {
    return {
        type: actionTypes.GET_ASSIGNMENT_FAIL,
        error: error
    }
}

export const AssignmentTimeOut = () => {
    sessionStorage.removeItem('minutes');
    sessionStorage.removeItem('seconds');
    return {
        type: actionTypes.GET_ASSIGNMENT_TIMEDOUT
    }
}

export const getAssignment = (token, assignmentID) => {
    console.log("Came here");
    return dispatch => {
        dispatch(getAssignmentStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.get(`http://127.0.0.1:8000/assesments/${assignmentID}`)
            .then(res => {
                const assignment = res.data
                dispatch(getAssignmentSuccess(assignment))
            })
            .catch(error => {
                dispatch(getAssignmentFailed(error))
            })
    }
}



