import React, { useState } from "react";
import classes from "./contact.module.css";
import {Form,Button} from 'react-bootstrap';
import {nameValidator,emailValidator} from '../../../helpers/validator';
import contact from '../../../store/actions/contact';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function Contact (props){


    const [name,setNameValue] = useState('');
    const [email,setEmailValue] = useState('');
    const [message,setMessageValue] = useState('');

    const submitHandler = ()=>{
      
        const contactData = {
            name, 
            email, 
            message
        };

        props.contact(contactData)

        setNameValue('');
        setEmailValue('');
        setMessageValue('');
    }


        
        const isNameValid = nameValidator(name);
        const isEmailValid = emailValidator(email);

            return (
            <>
                <h1 className={classes.heading}>Contact us page </h1>
                <Form className={classes.from}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className={classes.label}>Your name <span className={classes.sp}>*</span></Form.Label>
                    <Form.Control
                    style={{padding:'20px'}}
                    value={name}
                    className={!isNameValid ? classes.invalid : ''} 
                    type="text"
                    placeholder="name" 
                    onChange={(event)=>{
                        setNameValue(event.target.value)
                    }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className={classes.label}>Email address <span className={classes.sp}>*</span></Form.Label>
                    <Form.Control 
                    style={{padding:'23px'}}
                    value={email}
                    className={!isEmailValid ? classes.invalid : ''} 
                    type="email" 
                    placeholder="name@example.com" 
                    onChange={(event)=>{
                        setEmailValue(event.target.value);
                    }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={classes.label}>Your message</Form.Label>
                    <Form.Control 
                    value={message}
                    as="textarea" 
                    rows={8} 
                    onChange={(event)=>{
                        setMessageValue(event.target.value);
                    }}
                    />
                </Form.Group>
                <Button 
                className={classes.subButton}
                variant="primary"
                onClick={submitHandler}
                disabled = {!(isNameValid && isEmailValid)}
                >Submit</Button>
                </Form> 
            </>
            );
    
}

Contact.propTypes = {
    contact:PropTypes.func.isRequired
}

const mapDispatchtoProps = {
    contact,
}


export default connect(null,mapDispatchtoProps)(Contact);
