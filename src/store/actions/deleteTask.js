import * as actionTypes from '../actionTypes';
import { request } from '../../helpers/request';


export default function deleteTask(taskId){
    return (dispatch)=>{
        dispatch({type: actionTypes.DELETE_TASK_REQUEST});
        request.delete(`/tasks/${taskId}`)
        .then(res => {
            dispatch({type: actionTypes.DELETE_TASK_SUCCESS, taskId:taskId, res});
        })
        .catch(error=>{
            dispatch({type: actionTypes.DELETE_TASK_FAILURE, error: error.toString()});
        });
    }

}