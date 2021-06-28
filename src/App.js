import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/containers/ToDo/ToDo';
import NavMenu  from './components/NavMenue/NavMenu';
import About from './components/containers/About/About';
import Contact from './components/containers/Contact/Contact';
import {Route,Switch,Redirect} from 'react-router-dom';
import SingleTask from './components/containers/SingleTask/SingleTask';
import NotFound from './components/containers/NotFound/NotFound';


class App extends Component{
 

  render(){
    return (
      <div className="App">
        <NavMenu/>

        <Switch>
          <Route path='/' exact component={ToDo}/>
          <Route path='/about' exact component={About}/>
          <Route path='/contact' exact component={Contact}/>
          <Route path='/task/:id' exact component={SingleTask}/>
          <Route path='/404' exact component={NotFound}/>
          <Redirect to='/404'/>
        </Switch>
      </div>  
    );
  }
}

export default App;
