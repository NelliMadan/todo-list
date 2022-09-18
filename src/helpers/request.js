export  const request = {
    get,
    post,
    put,
    delete:_delete
}

const mainUrl = 'http://localhost:3001';

function getParams(data) {
    if(!data)return {};
    return {
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }  
    }
}

export function get(url){
    return fetch(url, {
        method: 'GET',
    })
    .then(checkStatus);
}

function post(url,data) {
    return fetch(mainUrl+url, {
        method: 'POST',
        ...getParams(data)
    })
    .then(checkStatus);
}


function put(url,data) {
    return fetch(mainUrl+url, {
        method: 'PUT',
        ...getParams(data)
    })
    .then(checkStatus);
}

function _delete(url,data) {
    return fetch(mainUrl+url, {
        method: 'DELETE',
        ...getParams(data)
    })
    .then(checkStatus);
}


function checkStatus(res) {
    return res.json()
    .then(response => {
        if(response.error){
            throw response.error;
        }
        return response;
    })
}

