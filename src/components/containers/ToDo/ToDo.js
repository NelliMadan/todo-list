import React, { Component } from 'react';
//import classes from './todo.module.css';
import Task from '../../Task/Task';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faPlus} from '@fortawesome/free-solid-svg-icons';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import TaskModal from '../../TaskModal/TaskModal';
import Modal from '../../Modal';
import Search from '../../Search/Search';
//import {request} from '../../../helpers/request';
import {connect} from 'react-redux';
import getTasks from '../../../store/actions/getTasks';

class ToDo extends Component {

    state = {
        taskIds: new Set(),
        isEditing: false,
        taskIndex: null,
        editTaskIndex: null,
        showAddTaskModal: false,
        showEditTaskModal: false
    }

    componentDidMount() {
        this.props.getTasks();      
    }

    componentDidUpdate(prevProps){
        const search = this.props.location.search
        if(prevProps.location.search !== search){
            this.props.getTasks(search);   
        }  
    }


    addTask = (taskData) => {
        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.error){
                throw response.error;
            }
            this.props.enqueueSnackbar('Task added successfully', { 
                variant: 'success',
            });
            this.setState({
                tasks: [...this.state.tasks, response],
                showAddTaskModal: false
            });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });
    }

    removeButtonHandler = (taskId) => () => {
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'Delete',
        })
        .then(res => res.json())
        .then(response => {
            if(response.error){
                throw response.error;
            }
            if(response.success){
                this.props.enqueueSnackbar('Task delete successfully', { 
                    variant: 'success',
                });
            }
            else {
                throw new Error('Something went wrong, please, try again later!');
            }
            

            const tasks = [...this.state.tasks];
            const taskIndex = tasks.findIndex(task => task.id === response.id);
            tasks[taskIndex] = response;
            this.setState({
                tasks,
                showEditTaskModal: false
            });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });


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
        const taskIds = [...this.state.taskIds];
        fetch(`http://localhost:3001/tasks`, {
            method: 'Delete',
            body: JSON.stringify({tasks: taskIds}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.error){
                throw response.error;
            }
            if(response.success){
                this.props.enqueueSnackbar('Task delete successfully', { 
                    variant: 'success',
                });
            }
            else {
                throw new Error('Something went wrong, please, try again later!');
            }
            let tasks = [...this.state.tasks];
            taskIds.forEach(id => {
                tasks = tasks.filter(task => task.id !== id);
            });
    
            this.setState({
                tasks,
                taskIds: new Set()
            });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
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

    handleEdit = (taskId) => {
        this.setState({
            showEditTaskModal: true,
            editTaskIndex: this.state.tasks.findIndex(el=> el.id === taskId),
        });
    }

    selectAllHandler = () => {
        const taskIds = this.state.tasks.map(task => task.id);
        this.setState({ taskIds: new Set(taskIds) });
    };

    deSelectAllHandler = () => {
        this.setState({ taskIds: new Set() });
    };

    handleModalClose = () => {
        this.setState({
            taskIndex: null
        });
    }

    handleModalOpen = (taskIndex) => () => {
        this.setState({
            taskIndex: taskIndex
        });
    }

    toggleTaskModal = (type)=>() => {
        this.setState({ [`show${type}TaskModal`]: !this.state[`show${type}TaskModal`] });
    };

    editTask = (taskId, taskData)=>{
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.error){
                throw response.error;
            }
            this.props.enqueueSnackbar('Task edited successfully', { 
                variant: 'success',
            });

            const tasks = [...this.state.tasks];
            const taskIndex = tasks.findIndex(task => task.id === response.id);
            tasks[taskIndex] = response;
            this.setState({
                tasks,
                showEditTaskModal: false
            });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });
    };

    searchTasks = (data)=>{
        let query = '';

        for(let key in data){
            if(data[key]){
                query+= `${key}=${data[key]}&`;
            }
        }

        this.props.history.push(`/?${query}`);
        
    }

    render() {
        const { taskIds, taskIndex } = this.state;
        const {tasks} = this.props;

        const tasksArr = tasks.map((task, index) => {
            return (
                <Col key={task.id} sm='6' md='4' lg='3' xl='2' >
                    <Task
                        data={task}
                        onDelete={this.removeButtonHandler(task.id)}
                        onCheck={this.handleCheck(task.id)}
                        onSaveEdit={this.handleSaveEdit(task.id)}
                        onEdit={this.handleEdit}
                        isSelected={this.state.taskIds.has(task.id)}
                        onOpenModal={this.handleModalOpen(index)}
                    />
                </Col>
            )
        }

        );

        return (
            <>
                <Container>
                    
                    <Button
                        className='mx-auto'
                        variant='primary'
                        onClick={this.toggleTaskModal('Add')}
                    >
                        Add task
                    </Button>
                    <Search 
                    onSumbit = {this.searchTasks}
                    />

                    <Row>
                        {tasksArr.length ? tasksArr : <p>There are no tasks yet</p>}
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

                        {!!taskIds.size &&
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
                {taskIndex !== null &&
                    <TaskModal
                        show={taskIndex !== null}
                        onHide={this.handleModalClose}
                        taskData={tasks[taskIndex]}
                        onDelete={this.removeButtonHandler(tasks[taskIndex].id)}
                        onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
                        onEdit={this.handleEdit}
                    />
                }

                <Modal
                    type = 'add'
                    open={this.state.showAddTaskModal}
                    onHide={this.toggleTaskModal('Add')}
                    onAddTask={this.addTask}
                />
                <Modal
                    type = 'edit'
                    data = {tasks[this.state.editTaskIndex]}
                    open={this.state.showEditTaskModal}
                    onHide={this.toggleTaskModal('Edit')}
                    onAddTask={this.addTask}
                    onEditTask = {this.editTask}
                />
               
                       
                    {/* <span className = {classes.addButtondiv}>
                    <FontAwesomeIcon 
                    className = {classes.addButton}
                    icon={faPlus} onClick={this.toggleTaskModal('Add')} />
                    </span> */}
                   
                     
                    
            </>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        tasks:state.taskReducer.tasks
    }
}

const mapDispatchToProps = {
    getTasks,
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDo);