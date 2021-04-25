import {Component} from 'react';

class NewTask extends Component{

    state= {
        inputText:''
    }

    inputChangeHandler = (event) =>{
        this.setState({inputText:event.target.value})
    }

    buttonClickHandler = ()=>{
        const {inputText} = this.state;
        if(!inputText) return;
        this.props.onTaskAdd(inputText);
        this.setState({ inputText:''})
    }

    render(){
        return(
            <>
            <input type="text"
            value={this.state.inputText}
            onChange={this.inputChangeHandler}
            />
            <button
            onClick={this.buttonClickHandler}
            >Add</button>
            </>
        );
    }
}

export default NewTask;