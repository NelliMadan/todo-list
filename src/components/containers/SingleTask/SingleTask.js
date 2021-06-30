import  { Component } from 'react';
import classes from './singleTask.module.css';
import { Button,Card } from 'react-bootstrap';
import {formatDate} from '../../../helpers/utils';
import {connect} from 'react-redux';
import  singelTask from '../../../store/actions/singleTask';
import  deleteSingleTask from '../../../store/actions/deleteTask';

class SingleTask extends Component {

    state = {
        task:null
    }

    componentDidMount(){
        const taskId = this.props.match.params.id;
        this.props.singelTask(taskId)
    }

    deleteTask = ()=>{
        const taskId = this.props.match.params.id;
        console.log(taskId);
        this.props.deleteSingleTask(taskId);
        this.props.history.push('/'); 
    };

    render() {
      
        const task = this.props.singleTaskData;

        return (
            <>
            {task  &&
                <>
                    <h1 className={classes.heading}>Single task page</h1>
                    <Card style={{ width: '25rem', margin: '25px auto ' }}>
                        <Card.Header>

                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                {task.description}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            Creation date {formatDate(task.created_at)}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            Creation date {formatDate(task.date)}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                    <Button
                    variant="danger"
                    onClick = {this.deleteTask}
                    disabled = {!task}
                    >
                        Delete task
                </Button>
                </>

             }
            </>
        );
    }
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