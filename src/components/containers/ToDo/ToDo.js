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
import {connect} from 'react-redux';
import getTasks from '../../../store/actions/getTasks';
import addTask from '../../../store/actions/addTask';
import editTask from '../../../store/actions/editTask';
import deleteTask from '../../../store/actions/deleteTask';
import deleteBulkTask from '../../../store/actions/deleteBulkTasks';


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
        if(!prevProps.addTaskSucces && this.props.addTaskSucces){
            this.setState({showAddTaskModal:false})
        }
    }


    removeButtonHandler = (taskId) => () => {
        this.setState({
            taskIndex: null
        });

        this.props.deleteTask(taskId);    
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
        const { taskIds } = this.state;
        const SelectedtaskIds = Array.from(taskIds);
        this.props.deleteBulkTask(SelectedtaskIds);
        this.setState({taskIds: new Set()})
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
            editTaskIndex: this.props.tasks.findIndex(el=> el.id === taskId),
        });
    }

    selectAllHandler = () => {
        const taskIds = this.props.tasks.map(task => task.id);
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
            this.props.editTask(taskId,taskData)
            this.setState({
                showEditTaskModal: false
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
                />
                <Modal
                    type = 'edit'
                    data = {tasks[this.state.editTaskIndex]}
                    open={this.state.showEditTaskModal}
                    onHide={this.toggleTaskModal('Edit')}
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
        tasks:state.taskReducer.tasks,
        addTaskSucces:state.taskReducer.addTaskSucces
    }
}

const mapDispatchToProps = {
    getTasks,
    addTask,
    editTask,
    deleteTask,
    deleteBulkTask
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDo);