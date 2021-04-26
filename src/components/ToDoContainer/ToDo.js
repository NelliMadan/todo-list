import React, { Component } from 'react';
import classes from './todo.module.css';
import { idGen } from '../../helpers/utils';
import Task from '../Task/Task';
import NewTask from '../NewTask';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';


class ToDo extends Component {

    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false,
        taskIndex: null
    }

    componentDidMount(){
        fetch('http://localhost:3001/tasks',{
            method:'GET'
        })
        .then(res=> res.json())
        .then(data=>{
            this.setState({tasks:data})
            console.log(data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    addTask = (inputText) => {
        const data = {
            title:inputText.slice(0,5),
            description:inputText
        }
        fetch('http://localhost:3001/tasks',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=>{
            this.setState({ tasks: [...this.state.tasks,data]}); 
        })
        .catch(error =>{
            console.log(error);
        })
    }

    removeButtonHandler = (taskId) => () => {
    
        const newTasks = this.state.tasks.filter(({ id }) => taskId !== id);
        const newTaskIds = new Set(this.state.taskIds);
        newTaskIds.delete(taskId);

        this.setState({
            tasks: newTasks,
            taskIds: newTaskIds,
            taskIndex: null
        });
    }

    handleCheck = (taskId) => () => {
        let taskIds = new Set(this.state.taskIds);

        if (taskIds.has(taskId)) {
            taskIds.delete(taskId);
        }
        else {
            taskIds.add(taskId);
        }
        this.setState({ taskIds });
    }


    removeBulkHandler = () => {
        let { tasks, taskIds } = this.state;

        taskIds.forEach(id => {
            tasks = tasks.filter(task => task.id !== id);
        });

        this.setState({
            tasks,
            taskIds: new Set()
        });

    }

    handleSaveEdit = (id) => (text) => {
        const tasks = JSON.parse(JSON.stringify(this.state.tasks));

        for (let task of tasks) {
            if (task.id === id) {
                task.text = text;
                break;
            }
        }
        this.setState({ tasks, isEditing: false });
    }

    handleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    selectAllHandler = ()=>{
        const taskIds = this.state.tasks.map(task => task.id);
        this.setState({taskIds: new Set(taskIds)});
    };

    deSelectAllHandler = ()=>{
        this.setState({taskIds: new Set()});
    };

    handleModalClose = ()=>{
        this.setState({
            taskIndex: null
        });
    }

    handleModalOpen  = (taskIndex)=> ()=> {
        this.setState({
            taskIndex: taskIndex
        });
    }

    render() {
      const {tasks, taskIds, isEditing, taskIndex} = this.state;

        const tasksArr = tasks.map((task, index) => {
                return (
                    <Col key={task.id} sm='6' md='4' lg='3' xl='2' >
                        <Task
                            data={task}
                            onDelete={this.removeButtonHandler(task.id)}
                            onCheck={this.handleCheck(task.id)}
                            onSaveEdit={this.handleSaveEdit(task.id)}
                            onEdit={this.handleEdit}
                            isSelected = {this.state.taskIds.has(task.id)}
                            onOpenModal = {this.handleModalOpen(index)}
                        />
                    </Col>
                )
            }

            );

        return (
            <>
                {              /*   <Container fluid>
                    <Row>
                        <Col sm='6' md='4' lg='3' xl='2' className={classes.col}>
                        <div className = {classes.block} ></div>
                        </Col>
                        <Col sm={{span: 4, offset: 4}} md='4' lg='3' xl='2' className={classes.col}>
                        <div className = {classes.block} ></div>
                        </Col>
                        <Col sm='6' md='4' lg='3' xl='2' className={classes.col}>
                        <div className = {classes.block} ></div>
                        </Col>
                        <Col sm='6' md='4' lg='3' xl='2' className={classes.col}>
                        <div className = {classes.block} ></div>
                        </Col>
                        <Col sm='6' md='4' lg='3' xl='2' className={classes.col}>
                        <div className = {classes.block} ></div>
                        </Col>
                        <Col sm='6' md='4' lg='3' xl='2' className={classes.col}>
                        <div className = {classes.block} ></div>
                        </Col>
                    </Row>
                    <Row>
                    <Col className={classes.col}>7</Col>
                    <Col className={classes.col}>8</Col>
                    <Col className={classes.col}>9</Col>
                    <Col className={classes.col}>10</Col>
                    </Row>
                </Container>
 */}

                <Container>
                    <Row className={classes.inputRow}>
                        <Col>
                            <NewTask
                                onTaskAdd={this.addTask}
                                disabled={isEditing}
                            />
                        </Col>
                    </Row>


                    <Row>
                        {tasksArr}
                    </Row>

                    <Row>
                        <Button
                            className='mx-auto'
                            variant='danger'
                            onClick={this.removeBulkHandler}
                            disabled={!taskIds.size}
                        >
                            Remove
                         </Button>
                        {
                            tasks.length !== taskIds.size &&
                            <Button
                            className='mx-auto'
                            variant='secondary'
                            onClick={this.selectAllHandler}
                        >
                            Select all
                         </Button>
                         
                        }

                        { !!taskIds.size &&
                            <Button
                            className='mx-auto'
                            variant='secondary'
                            onClick={this.deSelectAllHandler}
                        >
                            Deselect all
                         </Button>
                        }

      

                    </Row>
                </Container>
             { taskIndex !== null &&  
                <TaskModal
                show = {taskIndex !== null}
                onHide = {this.handleModalClose}
                taskData = {tasks[taskIndex]}
                onDelete={this.removeButtonHandler(tasks[taskIndex].id)} 
                onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
                onEdit={this.handleEdit}
                />
            }
            </>
        );
    }
}

export default ToDo;


