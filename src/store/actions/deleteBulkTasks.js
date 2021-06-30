import * as actionTypes from '../actionTypes';
import { request } from '../../helpers/request';


export default function deleteBulkTask(tasksIds){
    return (dispatch) => {
        dispatch({type: actionTypes.DELETE_BULK_REQUEST});
        request.delete(`/tasks`,{tasks:tasksIds})
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.DELETE_BULK_SUCCESS, tasksIds: tasksIds,response}) 
        })
        .catch(error => {
            dispatch({type: actionTypes.DELETE_BULK_FAILURE, error: error.toString()});
        });
    }

}