import {Component} from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap';

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
        const {disabled} = this.props;
        return(
            <>
           {/*  <input type="text"
            disabled = {disabled}
            value={this.state.inputText}
            onChange={this.inputChangeHandler}
            /> */}
              <InputGroup>
    <FormControl
      placeholder="add task"
      disabled = {disabled}
      value={this.state.inputText}
      onChange={this.inputChangeHandler}

    />

    <Button variant="primary"  onClick={this.buttonClickHandler}
            disabled = {disabled}>Add</Button>
    </InputGroup>
        {/*     <button
            onClick={this.buttonClickHandler}
            disabled = {disabled}
            >Add</button> */}
          {/*  <Button variant="primary"  onClick={this.buttonClickHandler}
            disabled = {disabled}>Add</Button> */}
            </>
        );
    }
}

export default NewTask;