import {Component} from 'react';
import {Button,InputGroup,FormControl,SplitButton,Dropdown,Navbar,Nav} from 'react-bootstrap';
import classes from './search.module.css';
import  PropTypes  from 'prop-types';


class Search extends Component{

    constructor(props){
        super(props);
        this.defaultState = {
            search: '',
            sortId:'',
            sortTitle:'',
            filterId:'',
            filterTitle:'',
            date:''
        }
        this.state = this.defaultState;
    }

    sort = [
        {
            id:'none',
            title:'None'
        },
        {
            id:'a-z',
            title:'a-z'
        },
        {
            id:'z-a',
            title:'z-a'
        }, 
        {
            id: 'creation_date_oldest',
            title: 'creation date oldest'
        }, 
        {
            id:'creation_date_newest',
            title:'creation date newest'
        }, 
        {
            id: 'completion_date_oldest',
            title: 'completion date oldest'
        },
        {
            id:'completion_date_newest',
            title:'completion date newest'
        }];

    filter = [
            {
                id:'none',
                title:'None'
            },
            {
                id:'create_lt',
                title:'created before'
            },
            {
                id:'create_gt',
                title:'created after'
            }, 
            {
                id: 'complete_lt',
                title: 'complete befor'
            }, 
            {
                id:'complete_gt',
                title:'complete after'
            }
        ];


    submitHandler = (type) => (event)=>{
        if(type === 'reset'){
            this.props.onSumbit({});
            this.setState(this.defaultState);
        }
               
        if((!type && event.key === 'Enter') || type === 'submit'){
            const {date,filterId,sortId,search} = this.state;
            
            const data = {
                search,
                sort:sortId,
            };
            if(filterId && date){
                data[filterId] = date;
            }
            this.props.onSumbit(data); 
            this.setState(this.defaultState);
        }
    }
    
    inputChangeHandler = (event)=>{
        this.setState({search:event.target.value});
    }

    selectHandler = (type,id,title)=>()=>{
        if (id === 'none') {
            this.setState({ [type + 'Id']: '', [type + 'Title']: '' });
        }
        else {
        this.setState({ [type + 'Id']: id, [type + 'Title']: title });
        }
    }

    dateChangeHandler = (event)=>{
        this.setState({date:event.target.value});
    }

    render(){
        const { search,date,filterTitle,filterId,sortId,sortTitle} = this.state;

        return(
            <>
                
                <Navbar >
                    <Nav className="mr-auto">
                        <SplitButton
                            variant='primary'
                            title={sortTitle || 'Sort'}
                        >
                            {this.sort.map(({ id, title }) =>
                                <Dropdown.Item
                                    key={id}
                                    onClick={this.selectHandler('sort', id, title)}
                                    className={`${sortId === id ? classes.active : ''} ${classes.sortItem}`}
                                >
                                    {title}
                                </Dropdown.Item>)
                            }
                        </SplitButton>


                        <SplitButton
                            style = {{margin:'0 15px'}}
                            variant='primary'
                            title={filterTitle || 'Filter'}
                        >
                            {this.filter.map(({ id, title }) =>
                                <Dropdown.Item
                                    key={id}
                                    onClick={this.selectHandler('filter', id, title)}
                                    className={`${filterId === id ? classes.active : ''} ${classes.sortItem}`}
                                >
                                    {title}
                                </Dropdown.Item>)
                            }
                        </SplitButton>
                        <input className={classes.searchData} type="date" value={date} onChange={this.dateChangeHandler} />
                        
                    </Nav>
                    <FormControl
                        style={{ maxWidth: '400px' }}
                        placeholder="Search task"
                        aria-label="Search task"
                        aria-describedby="basic-addon2"
                        value={search}
                        onChange={this.inputChangeHandler}
                        onKeyDown={this.submitHandler()}
                    />
                    <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.submitHandler('submit')}

                    >
                        Search
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={this.submitHandler('reset')}
                >
                    Reset
                </Button>
                    </InputGroup.Append>
                </Navbar>
            </>
        );
    }
}

Search.proptype = {
    onSumbit:PropTypes.func.isRequired
};

export default Search;