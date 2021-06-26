import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';


class TaskModal extends React.Component{
state = {
  isEdit: false
}


handleEdit = (taskData) => ()=>{
  console.log(taskData.id);
  this.setState({
    isEdit: true
  });
  this.props.onEdit(taskData.id);
}

saveEdit = (editedText) => {
  this.props.onSaveEdit(editedText);
  this.setState({
    isEdit: false,
  });
}

cancelEdit = () => {
  this.setState({
    isEdit: false,
  });
  this.props.onEdit();
}

render(){
  const {taskData} = this.props;

        return (
            <Modal
            show = {this.props.show}
            onHide = {this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Full task information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{taskData.title}</h4>
              <p>
              {taskData.description}
            </p>
              <p>
              Created {taskData.created_at.slice(0,10)}
              </p>
              <p>
                Due date {taskData.date.slice(0,10)}
              </p>
          
              <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit(taskData)} />
              <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.onDelete} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
}

}

export default TaskModal;