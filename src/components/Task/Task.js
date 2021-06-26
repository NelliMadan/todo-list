import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../helpers/utils';

 function Task (props) {
  
    const { data } = props;

    return (
      <Card>
        <Card.Header>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={props.onCheck}
          />
          <p>
          {formatDate(data.date)}
          </p>
          <p>
          {formatDate(data.created_at)}
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {data.title}
            </Card.Title>
          <Card.Text>
            {data.description}
          </Card.Text>
              <FontAwesomeIcon icon={faEdit} onClick={()=>props.onEdit(data.id)} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={props.onDelete} />
                <p>
                <Button 
                variant="primary" 
                onClick = {props.onOpenModal}
                >
                View</Button>
                </p>
    
        </Card.Body>
      </Card>
    );
}

export default Task;
