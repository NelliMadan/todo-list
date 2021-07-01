import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../helpers/utils';
import {Link} from 'react-router-dom';
import PropTypes  from 'prop-types';

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
                Open in modal</Button>
                <Link to={`/task/${data.id}`}>
                  <Button 
                  variant="primary" 
                  onClick = {props.onOpenModal}
                  >
                  Single page</Button>
                </Link>

                </p>
    
        </Card.Body>
      </Card>
    );
}

Task.propTypes = {
    data:PropTypes.object.isRequired,
    onDelete:PropTypes.func.isRequired,
    onCheck:PropTypes.func.isRequired,
    onEdit:PropTypes.func.isRequired,
    isSelected:PropTypes.bool.isRequired,
    onOpenModal:PropTypes.func.isRequired
}

export default Task;
