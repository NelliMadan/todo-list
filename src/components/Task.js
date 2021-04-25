import './task.css';

function Task(props){

    const {text} = props;
    const spanStyle = {
        fontSize:'20px',
        color:'red'
    }

    return(
        <div className='task-block'>
            <input 
            type="checkbox"
            onChange = {props.onCheck}
            />
            <span
            style={spanStyle}>{text}</span>
            <button onClick={props.onDelete}>x</button>
        </div>
    );
}
export default Task;