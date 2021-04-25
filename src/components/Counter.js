import {Component} from 'react'

class Counter extends Component{

    state = {
        count:0
    }

    decrement = ()=>{
        let {count} = this.state;
        this.setState({count:count-1})
    }
    
    increment = ()=>{
        let {count} = this.state;
        this.setState({count:count+1})
    }


    render(){
        return(
            <div>
                <button onClick={this.decrement}>-</button>
                <span>{this.state.count}</span>
                <button onClick={this.increment}>+</button>
            </div>
        );
    }
}

export default Counter;