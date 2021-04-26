import React, {Component} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';

class EditTask extends Component{
    constructor(props){
        super(props)

        this.state = {
            editText : props.text
        }
    }

  handleInputChange = (event) => {
    this.setState({
      editText: event.target.value
    });
  }

  
  cancelEdit = () => {
    this.setState({
      editText: this.props.text
    });
    this.props.onCancelEdit();
  }

  saveEdit = () => {
    this.props.onSaveEdit(this.state.editText);
  }

    render(){
        return(
            <InputGroup size="sm" className="mb-3">
            <FormControl
             aria-label="Small" 
             aria-describedby="inputGroup-sizing-sm" 
             value={this.state.editText} 
             onChange={this.handleInputChange}
             />
            <InputGroup.Append>
              <InputGroup.Text id="inputGroup-sizing-sm">
                <FontAwesomeIcon icon={faSave} onClick={this.saveEdit} />
                <FontAwesomeIcon icon={faWindowClose} onClick={this.cancelEdit} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        );
    }
}

export default EditTask;