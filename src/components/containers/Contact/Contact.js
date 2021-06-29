import React, { Component } from "react";
import classes from "./contact.module.css";
import {Form,Button} from 'react-bootstrap';
import {nameValidator,emailValidator} from '../../../helpers/validator';
import { withSnackbar } from 'notistack';

class Contact extends Component {

    state = {
        name:'',
        email:'',
        message:''
    }

    submitHandler = ()=>{
        const {name,email,message} = this.state;
        const contactData = {
            name, 
            email, 
            message
        };
        console.log(contactData);
        fetch(`http://localhost:3001/contact`, {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            this.props.enqueueSnackbar('contact send success', { 
                variant: 'success',
            });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });
        this.setState({
            name:'',
            email:'',
            message:''
        })
    }

    inputChangeHandler = (type)=> (event)=> {
        this.setState({
            [type]:event.target.value
        });
        
    }
    render() {
        
        const {name,email,message} = this.state;
        const isNameValid = nameValidator(name);
        const isEmailValid = emailValidator(email);

            return (
            <>
                <h1 className={classes.heading}>Contact us page </h1>
                <Form className={classes.from}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your name <span className={classes.sp}>*</span></Form.Label>
                    <Form.Control
                    value={name}
                    className={!isNameValid ? classes.invalid : ''} 
                    type="text"
                    placeholder="name" 
                    onChange={this.inputChangeHandler('name')}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address <span className={classes.sp}>*</span></Form.Label>
                    <Form.Control 
                    value={email}
                    className={!isEmailValid ? classes.invalid : ''} 
                    type="email" 
                    placeholder="name@example.com" 
                    onChange={this.inputChangeHandler('email')}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Your message</Form.Label>
                    <Form.Control 
                    value={message}
                    as="textarea" 
                    rows={3} 
                    onChange={this.inputChangeHandler('message')}
                    />
                </Form.Group>
                <Button 
                variant="outline-primary"
                onClick={this.submitHandler}
                disabled = {!(isNameValid && isEmailValid)}
                >Submit</Button>
                </Form> 
            </>
            );
    }
}

export default withSnackbar(Contact);
