
function Task(props){

    const {text} = props;

   

    return(
        <div>
            <span>{text}</span>
            <button onClick={props.onDelete}>X</button>
        </div>
    );
}
export default Task;