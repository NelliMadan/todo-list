import React from 'react';
import { Modal, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import addTask from '../store/actions/addTask';
 

class AddEditModal extends React.Component {
    constructor(props){
    super(props);
        
        this.initialState={
            title:'',
            date:'',
            description:''
        }
 
        this.state = this.initialState;
    }
        
    componentDidUpdate(prevProps){
        if(prevProps.open && !this.props.open){
            this.setState(this.initialState);    
        }
        else if(!prevProps.open && this.props.open){
            this.setState(this.props.data);
        }
    }

    onChangeHandler =(type)=>(event)=>{
        this.setState({
            [type]:event.target.value
        })
    }

    addTask=()=>{
        const {title, date, description} = this.state;
        const taskData = {
            title, 
            date, 
            description
        };
        this.props.addTask(taskData);
    }

    editTask = ()=>{
        const {title, date, description, id} = this.state;
        const {data} = this.props;
        const taskData = {};

        (title !== data.title) &&  (taskData.title = title);
        (date !== data.date) &&  (taskData.date = date);
        (description !== data.description) &&  (taskData.description = description);

        this.props.onEditTask(id, taskData);
    }

    render() {
       
        const {title,date,description} = this.state;


        return (
            <>

                <Modal
                    style={{color:'gray',fontFamily: 'Nanum Myeongjo, serif'}}
                    show={this.props.open}
                    onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.type === 'add' ?`Add new Task` : `Edit task`} 
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup >
                            <FormControl
                                placeholder="title"
                                value={title}
                                onChange={this.onChangeHandler('title')}
                            />
                        </InputGroup>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={description}
                            onChange={this.onChangeHandler('description')}
                             />
                        </Form.Group>
                        <input
                        style={{
                            borderRadius:'7px',
                            border:'1px solid gray'
                        }} 
                         type="date"
                         value={date.slice(0,10)}
                         onChange={this.onChangeHandler('date')}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                       {this.props.type === 'add'?
                        <Button variant="outline-info" 
                        onClick={this.addTask}
                        disabled={!title}
                        >Add</Button>:
                        <Button variant="outline-info" 
                        onClick={this.editTask}
                        disabled={!title}
                        >Save</Button>
                        }

                        <Button onClick={this.props.onHide} variant="outline-danger">Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

AddEditModal.proptype = {
    type:PropTypes.string.isRequired,
    open:PropTypes.bool.isRequired,
    onHide:PropTypes.func.isRequired,
    onAddTask:PropTypes.func,
    onEditTask:PropTypes.func
};

export default connect(null,{
    addTask
})(AddEditModal);