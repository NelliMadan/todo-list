import thunkMiddleware from 'redux-thunk';
import taskReducer from '../store/reducers/taskReducer';
import loggerMiddleware from 'redux-logger';
import {createStore,applyMiddleware,combineReducers} from 'redux';


const rootReducer = combineReducers({
    taskReducer
});

const middleware = applyMiddleware(thunkMiddleware,loggerMiddleware);

export const store = createStore(rootReducer,middleware);