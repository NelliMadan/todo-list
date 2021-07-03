import  {useEffect} from 'react';
import classes from './singleTask.module.css';
import { Button,Card } from 'react-bootstrap';
import {formatDate} from '../../../helpers/utils';
import {connect} from 'react-redux';
import  singelTask from '../../../store/actions/singleTask';
import  deleteSingleTask from '../../../store/actions/deleteTask';
import PropTypes from 'prop-types';

function SingleTask (props) {


    useEffect(()=>{
        const taskId = props.match.params.id;
        props.singelTask(taskId);
    },[]);

    const deleteTask = ()=>{
        const taskId = props.match.params.id;
        console.log(taskId);
        props.deleteSingleTask(taskId);
        props.history.push('/'); 
    };


        const task = props.singleTaskData;

        return (
            <>
            {task  &&
                <div style={{height:'93.7vh'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h1 className={classes.heading}>Single task page</h1>
                    <Card style={{ width: '30rem', margin: '25px auto ' }}>
                        <Card.Header>

                        </Card.Header>
                        <Card.Body>
                            <Card.Title className={classes.singTaskTitle}>{task.title}</Card.Title>
                            <Card.Text className={classes.singleTaskText}>
                                {task.description}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                           {formatDate(task.created_at)}   (Creation date)
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            {formatDate(task.date)}    (data)
                            </Card.Text>

                        </Card.Body>
                        
                    </Card>
                    <Button
                    className={classes.singleTaskButton}
                    variant="danger"
                    onClick = {deleteTask}
                    disabled = {!task}
                    >
                        Delete task
                    </Button>
                    </div>
                </div>

             }
            </>
        );
    
}

SingleTask.propTypes = {
    singleTaskData:PropTypes.object.isRequired,
    deleteSingleTask:PropTypes.func.isRequired,
    singelTask:PropTypes.func.isRequired,
}

const mapStateToProps=(state)=>{
    return{
        singleTaskData:state.taskReducer.singleTaskData
    }
}

const mapDispatchtoProps={
    singelTask,
    deleteSingleTask
}

export default connect(mapStateToProps,mapDispatchtoProps)(SingleTask);