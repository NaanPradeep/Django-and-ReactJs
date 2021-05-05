import axios from 'axios';
import * as actionType from './actionTypes';

const getStudentPerformanceListStart = () => {
    return {
        type: actionType.GET_STUDENT_PERFORMANCE_START
    };
}

const getStudentPerformanceListSuccess = (details) => {
    return {
        type: actionType.GET_STUDENT_PERFORMANCE_SUCCESS,
        details
    };
}

const getStudentPerformanceListFailed = (error) => {
    return {
        type: actionType.GET_STUDENT_PERFORMANCE_FAILED,
        error
    };
}

export const getStudentPerformance = (email, token) => {
    return dispatch => {
        dispatch(getStudentPerformanceListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };

        axios.get(`http://127.0.0.1:8000/assessment-performance/?email=${email}`)
            .then(res => {
                const details = res.data;
                console.log(details)
                dispatch(getStudentPerformanceListSuccess(details))
            })
            .catch(error => {
                dispatch(getStudentPerformanceListFailed(error))
            })
    }
}

const createStudentPerformanceStart = () => {
    return {
        type: actionType.SUBMIT_ASSESSMENT_START
    }
}

const createStudentPerformanceSuccess = (details) => {
    return {
        type: actionType.SUBMIT_ASSESSMENT_START,
        details
    }
} 

const createStudentPerformanceFailed = (error) => {
    return {
        type: actionType.SUBMIT_ASSESSMENT_FAILED,
        error
    }
}

export const createStudentPerformance = (token, submitDetails) => {
    return dispatch => {
        dispatch(createStudentPerformanceStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.post(`http://127.0.0.1:8000/assessment-performance/create-new/`, submitDetails)
            .then(res => {
                const details = res.data;
                dispatch(createStudentPerformanceSuccess(details))
            })
            .catch(error => {
                dispatch(createStudentPerformanceFailed(error))
            })
    }
}