import * as actionTypes from '../actionTypes';
import { request } from '../../helpers/request';

export default function getTasks(search = '') {
    return (dispatch)=>{
        dispatch({type:actionTypes.GET_TASKS_REQUEST});
        request.get(`/tasks${search}`)
        .then(res=>{
            dispatch({type:actionTypes.GET_TASKS_SUCCESS,data:res})
        })
        .catch(error=>{
            dispatch({type:actionTypes.GET_TASKS_FAILURE,error:error.toString()})
        })
    }
}