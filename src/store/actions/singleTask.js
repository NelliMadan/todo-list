import * as actionTypes from '../actionTypes';
import {request} from '../../helpers/request';

export default function singleTask(taskId){
    return (dispatch)=>{
        dispatch({type: actionTypes.SINGLETASK_REQUEST});
        request.get(`/tasks/${taskId}`)
        .then(res => {
            dispatch({type: actionTypes.SINGLETASK_SUCCESS, task: res});
        })
        .catch(error=>{
            dispatch({type: actionTypes.SINGLETASK_FAILURE, error: error.toString()});
        });
    }

}