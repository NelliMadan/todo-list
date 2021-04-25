import React,{Component} from 'react';
import {idGen} from '../utils';
import Task from './Task';
import NewTask from './NewTask';

class ToDo extends Component{

    state = {
        inputText:'',
        tasks:[]
    }

    
    addTask = (inputText)=>{
        const tasks = [...this.state.tasks];
        tasks.push({
            id:idGen(),            
            text:inputText,
        });
        this.setState({ 
            tasks
        })
    }

    removeButtonHandler = (taskId) => ()=>{
        const newTasks = this.state.tasks.filter(({id}) => taskId !== id);
        this.setState({
            tasks:newTasks,
        })
        
    }

    render(){
    
        const tasks = this.state.tasks
        .map(({id,text})=>{
            return (
                <Task 
                key={id} 
                text={text}
                onDelete = {this.removeButtonHandler(id)}
                />
              /*   <div key={task.id}>
                    <span>{task.text}</span>
                    <button onClick={this.removeButtonHandler(task.id)  }>X</button>
                </div> */
            )
        })

        return(
            <>
            <div>
                <NewTask
                onTaskAdd = {this.addTask}
                />
            </div>
            <div>
                {tasks}
            </div>
            </>
        );
    }
}

export default ToDo;