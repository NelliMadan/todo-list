import React,{Component} from 'react';


class Animal extends Component{
constructor(props){
    super(props);

    this.state = {
        age:props.age,
        inputText:''
    }
}

handleClick = ()=>{
    this.setState({age:this.state.age + 1});
}
handleInputChange = (event)=>{
    this.setState({inputText:event.target.value})
}

render(){
    console.log('render');
    return(
        <div 
        onClick = {this.handleClick} 
        >Hello , I am Doggy and I am a {this.props.type}
        <p>I am {this.state.age} years old</p> 
        <input type="text" 
        onChange={this.handleInputChange}
        />
        <p>{this.state.inputText}</p>
        </div>
    );
}
}

export default Animal; 