import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    assignments: [],
    currentAssignment: {},
    loading : null,
    error: null
}

const getAssignListStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const getAssignListSuccess = (state, action) => {
    return updateObject(state, {
        assignments: action.assignments,
        loading: false,
        error: false
    })
}

const getAssignListFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    }) 
}

const getAssignmentStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const getAssignmentSuccess = (state, action) => {
    return updateObject(state, {
        currentAssignment: action.assignment,
        loading: false,
        error: false
    })
}

const getAssignmentFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const getAssignmentTimedOut = (state, action) => {
    return updateObject(state, {
        currentAssignment: {},
    })
}

const assignmentReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.GET_ASSIGNMENT_LIST_START: return getAssignListStart(state, action);
        case actionType.GET_ASSIGNMENT_LIST_SUCCESS: return getAssignListSuccess(state, action);
        case actionType.GET_ASSIGNMENT_LIST_FAIL: return getAssignListFailed(state, action);
        case actionType.GET_ASSIGNMENT_START: return getAssignmentStart(state, action);
        case actionType.GET_ASSIGNMENT_SUCCESS: return getAssignmentSuccess(state, action);
        case actionType.GET_ASSIGNMENT_FAIL: return getAssignmentFailed(state, action);
        case actionType.GET_ASSIGNMENT_TIMEDOUT: return getAssignmentTimedOut(state, action);
        default:
            return state;
    }
}

export default assignmentReducer;