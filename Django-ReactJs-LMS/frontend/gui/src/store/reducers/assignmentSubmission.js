import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    assessmentPerformance: [],
    currentPerformance: {},
    loading: null,
    error: null
};
 
const getStudentPerformanceListStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const getStudentPerformanceListSuccess = (state, action) => {
    return updateObject(state, {
        assessmentPerformance: action.details,
        loading: false,
        error: null
    });
}

const getStudentPerformanceListFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const createPerformanceStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const createPerformanceSuccess = (state, action) => {
    return updateObject(state, {
        currentPerformance: action.details,
        loading: false
    })
}

const createPerformanceFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const performanceReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.GET_STUDENT_PERFORMANCE_START:
            return getStudentPerformanceListStart(state, action);
        case actionType.GET_STUDENT_PERFORMANCE_SUCCESS:
            return getStudentPerformanceListSuccess(state, action);
        case actionType.GET_STUDENT_PERFORMANCE_FAILED: 
            return getStudentPerformanceListFailed(state, action);
        case actionType.SUBMIT_ASSESSMENT_START:
            return createPerformanceStart(state, action)
        case actionType.SUBMIT_ASSESSMENT_SUCCESS:
            return createPerformanceSuccess(state, action)
        case actionType.SUBMIT_ASSESSMENT_FAILED:
            return createPerformanceFailed(state, action)

        default:
            return state;
    }
}

export default performanceReducer;