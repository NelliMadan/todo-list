import * as actionTypes from '../actionTypes';

const defaultState = {
    tasks:[],
    loading:false,
    error:null,
    success:null
};

export default function taskReducer(state = defaultState,action) {
    switch (action.type) {
        case actionTypes.GET_TASKS_REQUEST:
            return{
            ...state,
            loading:true
        }
        case actionTypes.GET_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                success:'success',
                tasks: action.data
            };
        case actionTypes.GET_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
    
        default:return state;
    }
}