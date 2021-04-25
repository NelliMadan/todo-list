import React from 'react';
import Name from './Name';
import SurName from './Surname';

function User(props){

    return (
        <div>
            Hello, I am 
            <Name name = {props.name}/>
            <SurName surname = {props.surname}/>
            !
        </div>
    );
}

export default User;