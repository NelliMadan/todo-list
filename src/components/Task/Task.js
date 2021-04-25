import {Component} from 'react';
import classes from './task.css';

class Task extends Component{

    constructor(props){
        super(props);
        console.log('Task constructor');
    }

    componentDidMount(){
        console.log('Task mounted');
    }

    /* warning componentWillMount(){
        console.log('Task wii mounted');
    } */

    componentDidUpdate(prevProps,prevState){
        console.log('Task updated');
    }

    shouldComponentUpdate(prevProps,prevState){
        return prevProps.text !== this.props.text;
    }

    render(){
        const {text} = this.props;

        const spanStyle = {
            fontSize:'20px',
            color:'maroon'
        }

        return(
            <div className={classes.taskBlock}>
                <input 
                type="checkbox"
                onChange = {this.props.onCheck}
                />
                <span style={spanStyle}>{text}</span>
                <button onClick={this.props.onDelete}>x</button>
            </div>
        );
    }
}
export default Task;