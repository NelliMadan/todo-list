import * as actionTypes from '../actionTypes';
import { request } from '../../helpers/request';


export default function addTask(taskData){
    return (dispatch)=>{
        dispatch({type: actionTypes.ADD_TASK_REQUEST});
        request.post(`/tasks`, taskData)
        .then(res => {
            dispatch({type: actionTypes.ADD_TASK_SUCCESS, task: res});
        })
        .catch(error=>{
            dispatch({type: actionTypes.ADD_TASK_FAILURE, error: error.toString()});
        });
    }

}
