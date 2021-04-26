import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import EditTask from '../EditTask';

export default class Task extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }


  handleEdit = () => {
    this.setState({
      isEdit: true
    });
    this.props.onEdit();
  }

  cancelEdit = () => {
    this.setState({
      isEdit: false,
    });
    this.props.onEdit();
  }

  saveEdit = (editedText) => {
    this.props.onSaveEdit(editedText);
    this.setState({
      isEdit: false,
    });
  }

  render() {
    // console.log('Task render');
    const { data } = this.props;
    const { isEdit } = this.state;

    return (
      <Card>
        <Card.Header>
          <input
            type="checkbox"
            checked={this.props.isSelected}
            onChange={this.props.onCheck}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>
            {data.description}
          </Card.Text>
          {
            isEdit ?
            <EditTask
            text = {this.props.text}
            onCancelEdit = {this.cancelEdit}
            onSaveEdit = {this.saveEdit}
            />           
            :
              <>
                <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.onDelete} />
                <p>
                <Button 
                variant="primary" 
                onClick = {this.props.onOpenModal}
                >
                View</Button>
                </p>
              </>
          }
        </Card.Body>
      </Card>
    );
  }
}
