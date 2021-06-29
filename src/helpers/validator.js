function nameValidator(value) {
    const reg = /[a-z^0-9]/ig;
    return reg.test(value);
}

function emailValidator(value){
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
}

export {nameValidator,emailValidator};