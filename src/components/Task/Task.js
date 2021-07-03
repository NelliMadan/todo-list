import React from 'react';
import classes from './task.module.css';
import { Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../helpers/utils';
import {Link} from 'react-router-dom';
import PropTypes  from 'prop-types';

 function Task (props) {
  
    const { data } = props;

    return (
      <>
      <Card className={classes.card}>
        <Card.Header>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
            <input
          type="checkbox"
          checked={props.isSelected}
          onChange={props.onCheck}
        />
          <h4>{data.title}</h4>
            </div>
            <div>
          <FontAwesomeIcon className={classes.icons}  icon={faEdit} onClick={()=>props.onEdit(data.id)} />
          <FontAwesomeIcon className={classes.icons}   icon={faTrashAlt} onClick={props.onDelete} />
            </div>
          </div>


          </Card.Header>
        <Card.Body>
          <Card.Title style={{display:'flex',justifyContent:'space-between'}}> {data.description}   
                <div>
                <Button 
                variant="outline-primary" 
                onClick = {props.onOpenModal}
                style={{marginRight:'15px'}}
                >
                Open in modal</Button>
                <Link to={`/task/${data.id}`}>
                  <Button 
                  variant="outline-primary" 
                  onClick = {props.onOpenModal}
                  >
                  Single page</Button>
                </Link>
              </div>
                </Card.Title>
          <Card.Text>
          <span>{formatDate(data.date)}  (data)</span>   
          <br/>
          <span> {formatDate(data.created_at)}  (created_at)</span> 
          </Card.Text>
        </Card.Body>
      </Card>
      </>
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
