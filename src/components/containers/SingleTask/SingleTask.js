import  { Component } from 'react';
import classes from './singleTask.module.css';
import { withSnackbar } from 'notistack';
import { Button,Card } from 'react-bootstrap';
import {formatDate} from '../../../helpers/utils';

class SingleTask extends Component {

    state = {
        task:null
    }

    componentDidMount(){
        fetch(`http://localhost:3001/tasks/${this.props.match.params.id}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((data)=>{
            if(data.error){
                throw data.error;
            }
            this.setState({ task: data });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });   
    }

    deleteTask = ()=>{
        const taskId = this.props.match.params.id;
        console.log(taskId);

        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'Delete',
        })
        .then(res => res.json())
        .then(response => {
            if(response.error){
                throw response.error;
            }
            this.props.history.push('/');  
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });

    };

    render() {
      
        console.log(this.state);
        const {task} = this.state;

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

export default withSnackbar(SingleTask);