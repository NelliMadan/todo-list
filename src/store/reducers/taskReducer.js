import * as actionTypes from '../actionTypes';

const defaultState = {
    tasks:[],
    loading:false,
    error:null,
    success:null,
    addTaskSucces:false,
    singleTaskData:null,
};

export default function taskReducer(state = defaultState,action) {
    switch (action.type) {
        case actionTypes.GET_TASKS_REQUEST:
            return{
            ...state,
            loading:true
        }
        case actionTypes.GET_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.data
            };
        case actionTypes.GET_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.ADD_TASK_REQUEST:
            return{
                ...state,
                loading:true,
                addTaskSucces:false,
                success:null
            }
        case actionTypes.ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                success:'Task added successfully!',
                tasks: [...state.tasks,action.task],
                addTaskSucces:true
            };
        case actionTypes.ADD_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.EDIT_TASK_REQUEST:
            return{
                ...state,
                loading:true,
                success:null
            }
        case actionTypes.EDIT_TASK_SUCCESS:
            const tasks = [...state.tasks];
            const taskIndex = tasks.findIndex(task => task.id === action.task.id);
            tasks[taskIndex] = action.task;
            return {
                ...state,
                loading: false,
                success:'Task edited successfully!',
                tasks,
            };
        case actionTypes.EDIT_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                success:null
            };
        case actionTypes.DELETE_TASK_SUCCESS:
            const newTasks = [...state.tasks].filter(({ id }) => action.taskId !== id);
            return {
                ...state,
                loading: false,
                tasks: newTasks,
                success: "Task deleted successfully"
            };
        case actionTypes.DELETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.DELETE_BULK_REQUEST:
            return {
                ...state,
                loading: true,
                success:null
            };
        case actionTypes.DELETE_BULK_SUCCESS:
            {
                const taskIds = action.tasksIds
                let tasks = [...state.tasks];
                taskIds.forEach(id => { tasks = tasks.filter(task => task.id !== id) });
                return {
                    ...state,
                    loading: false,
                    tasks,
                    success: "Task deleted successfully"
                };
            }
        case actionTypes.DELETE_BULK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            case actionTypes.SINGLETASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SINGLETASK_SUCCESS:
            return {
                ...state,
                loading: false,
                singleTaskData:action.task,
            };
        case actionTypes.SINGLETASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            case actionTypes.CONTACT_REQUEST:
                return {
                    ...state,
                    loading: true,
                    success:null
                };
            case actionTypes.CONTACT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    success: "Thank you for contacting us!!"
                };
            case actionTypes.CONTACT_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                }
        default:return state;
    }
}