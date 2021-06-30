import * as actionTypes from '../actionTypes';
import {request} from '../../helpers/request';

export default function contact(data){
    return (dispatch)=>{
        dispatch({type: actionTypes.CONTACT_REQUEST});
        request.post(`/contact`, data)
        .then(res => {
            dispatch({type: actionTypes.CONTACT_SUCCESS, data: res});
        })
        .catch(error=>{
            dispatch({type: actionTypes.CONTACT_FAILURE, error: error.toString()});
        });
    }

}
