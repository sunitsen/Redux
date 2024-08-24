// api -calling
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const {default: axios} = require('axios');
//STATES
const initialTodos = {
  todos: [],
  isLoading: false,
  error: null,
};

//Constants
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILED = "GET_TODOS_FAILED";
//api url
const API_URL = "https://jsonplaceholder.typicode.com/todos";


//Action Creators
const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};

const getTodosFailed = (error) => {
  return {
    type: GET_TODOS_FAILED,
    payload: error
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos
  };
};



const todosReducer = (state = initialTodos, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      }
    case GET_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error : action.payload
      }
  }
}


//async action

const fetchData =()=>{
  return (dispatch) =>{
    dispatch(getTodosRequest());
    axios.get(API_URL)
    .then((response)=>{
     const todos = response.data;
     dispatch(getTodosSuccess(todos));
    })
    .catch((error)=>{
      const errMessage = error.message;
      dispatch(getTodosFailed(errMessage));
    })
  }
}


const store = createStore(todosReducer, applyMiddleware(thunk));
store.subscribe(() =>{
 console.log(store.getState())
})
store.dispatch(fetchData());