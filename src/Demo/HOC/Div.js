import React from 'react';

export default function Div(props){
    console.log(props);
    return(
        <div>
            {props.text}
            {props.children[0]}
        </div>
    );
}