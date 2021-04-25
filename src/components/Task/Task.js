import {Component} from 'react';
import classes from './task.css';

class Task extends Component{
    constructor(props){
        super(props);
        this.state={
            isEdit:false,
            editText:props.text
        }
    }

    /* constructor(props){
        super(props);
        console.log('Task constructor');
    }

    componentDidMount(){
        console.log('Task mounted');
    }



    componentDidUpdate(prevProps,prevState){
        console.log('Task updated');
    }
 */



    /* shouldComponentUpdate(prevProps,prevState){
        return prevProps.text !== this.props.text;
    } */

    handleEdit = ()=>{
        this.setState({
            isEdit:true
        })
    }

    handleInputChange = (event)=>{
        this.setState({
            editText:event.target.value
        })
    }

    cancelEdit = ()=>{
        this.setState({
            isEdit:false,
            editText:this.props.text
        })
    }

    saveEdit = ()=>{
        this.props.onEdit(this.state.editText);
        this.setState({isEdit:false})
    }


    render(){
        const {text} = this.props;
        const {isEdit} = this.state;
        
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
                {
                    isEdit? 
                    <input type="text" 
                    value={this.state.editText}
                    onChange = {this.handleInputChange}
                    />:
                    <span style={spanStyle}>{text}</span>
                }
                {
                    isEdit?
                    <>
                    <button onClick = {this.saveEdit}>Save</button>
                    <button onClick = {this.cancelEdit} >Cancel</button>
                    </>:
                    <>
                    <button onClick={this.handleEdit}>edit</button>
                    <button onClick={this.props.onDelete}>x</button>
                    </>
                }
            </div>
        );
    }
}
export default Task;