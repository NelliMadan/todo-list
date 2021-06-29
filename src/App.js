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
import { withSnackbar } from 'notistack';
import {connect} from 'react-redux';
import Loader from '../src/components/Loader/Loader';


class App extends Component{

  componentDidUpdate(prevProps){
    if(!prevProps.success && this.props.success){
      this.props.enqueueSnackbar(this.props.success,{
        variant:'success'
      }) 
      return;
    }
    if(!prevProps.error && this.props.error){
      this.props.enqueueSnackbar(this.props.error,{
        variant:'error'
      }) 
      return;
    }
  }

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

        {this.props.loading && <Loader/>}
      </div>  
    );
  }
}

export default connect((state)=>({
  error:state.taskReducer.error,
  success:state.taskReducer.success,
  loading:state.taskReducer.loading
}))(withSnackbar(App));
