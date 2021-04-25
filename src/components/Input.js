import React ,{Component} from 'react';
import Data from './Data'

class Input extends Component{

    state={
        inputValue:'',
        dataValue:'',
        list:[]
    }

    inputChangeHandle = (event)=>{
        const nexState = {
            inputValue:event.target.value,
        }
        if(this.state.dataValue){
            nexState.dataValue = ''

        }
        this.setState(nexState);
    }

    buttonClickHandler = ()=>{
        //this.setState({dataValue:this.state.inputValue})
       /*  const list = [...this.state.list];
        list.push({
            text:this.state.inputValue
        })
        this.setState({
            list:list,
            inputValue:''
        }); */
        this.setState({
            list:[...this.state.list,{text:this.state.inputValue}],
            inputValue:''
        });
    }


    render(){
        const list = this.state.list.map((element,index)=><p key={index}>{element.text}</p>);

        let showButton = false;

        if(this.state.inputValue){
            showButton = true;
        }

        return(
            <>
                <input type="text"
                value={this.state.inputValue}
                onChange = {this.inputChangeHandle}
                />
                {
                    showButton &&
                     <button
                     onClick={this.buttonClickHandler}
                     >
                     Click me
                     </button>
                }
                {/* <Data text={this.state.dataValue}/> */}
                {list}
            </>
        );
    }
}

export default Input;

/* 
import React,{Component} from 'react';
import Text from './Text';

class ToDo extends Component{

    state = {
        text:'',
        inputText:''
    }

inputChangeHandler = (event)=>{
    const value = event.target.value;
    this.setState({inputText:value});   
}

buttonClickHandler = ()=>{
    const inputText = this.state.inputText;
    if(inputText){
        this.setState({
            text:inputText,
            inputText:''
        });
    }
}


    render(){
        return(
          <div>
              <input type="text"
              value={this.state.inputText}
              onChange = {this.inputChangeHandler}    
              />
              <button
              onClick = {this.buttonClickHandler}
              >Click me</button>
              <Text text={this.state.text}/>
          </div>
        );
    }
}

export default ToDo */