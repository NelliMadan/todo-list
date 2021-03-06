import  {useEffect} from 'react';
import classes from './singleTask.module.css';
import { Button,Card } from 'react-bootstrap';
import {formatDate} from '../../../helpers/utils';
import {connect} from 'react-redux';
import  singelTask from '../../../store/actions/singleTask';
import  deleteSingleTask from '../../../store/actions/deleteTask';
import PropTypes from 'prop-types';
import {upperCase} from '../../../helpers/utils';

function SingleTask (props) {


    useEffect(()=>{
        const taskId = props.match.params.id;
        props.singelTask(taskId);
    },[]);

    const deleteTask = ()=>{
        const taskId = props.match.params.id;
        props.deleteSingleTask(taskId);
        props.history.push('/'); 
    };


        const task = props.singleTaskData;  
        let title,description; 

        if(task !== null){
            title = upperCase(task.title);
            description = upperCase(task.description);
        } 

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
                            <Card.Title className={classes.singTaskTitle}>{title}</Card.Title>
                            <Card.Text className={classes.singleTaskText}>
                                {description}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                           {formatDate(task.created_at)}   (Creation date)
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            {formatDate(task.date)}    (data)
                            </Card.Text>

                        </Card.Body>
                        
                    </Card>
                    <div style={{display:'flex'}}>
                       <Button
                    className={classes.singleTaskButton}
                    variant="danger"
                    onClick = {deleteTask}
                    disabled = {!task}
                    >
                        Delete 
                    </Button>
                    <Button
                    className={classes.singleTaskButton}
                    variant="primary"
                    onClick = {()=>{
                        props.history.push('/'); 
                    }}
                    >
                    Back
                    </Button> 
                    </div>
                    
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