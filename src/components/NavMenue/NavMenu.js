import {useState} from 'react';
import classes from './navMenu.module.css';
import {NavLink,withRouter} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap';


function NavMenu(props) {

   

    return(
        <>
          <NavDropdown title="Menu" id="basic-nav-dropdown" className={classes.dropdown}>
            <ul className={classes.ul}>
                <li><NavLink activeClassName={classes.active} exact className={classes.navlink} to="/">Home</NavLink></li>
                <li><NavLink activeClassName={classes.active} exact className={classes.navlink} to="/about">About App</NavLink></li>
                <li><NavLink activeClassName={classes.active} exact className={classes.navlink} to="/contact">Contact</NavLink></li>
                </ul>
      </NavDropdown>
        </>
        
    );  
}

export default withRouter(NavMenu);