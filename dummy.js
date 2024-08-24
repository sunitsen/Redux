console.clear();
const {createStore} = require("redux");
// defining constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// initial state
const initialState = {
  count: 0,
}

const increment = () => {
  return {
    type: INCREMENT
  }
}

const decrement = () => {
  return {
    type: DECREMENT
  }
}

const reset = () => {
  return {
    type: RESET,
  }
}


const creatreReducer = (state = initialState, action) =>{
switch(action.type){
  case INCREMENT: return {
    ...state,
    count: state.count + 1
  }
  case DECREMENT: return {
    ...state,
    count: state.count - 1
  }
  case RESET: return {
    ...state,
    count:0,
  }
  default: return state
}
}

const store = createStore(creatreReducer);
store.subscribe(() =>{
  console.log(store.getState())
});

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

////
const { createStore } = require("redux");

const ADD_USER = "ADD_USER";

const initialState = {
  user: ['sunit'],
  count: 0,
};

const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: [...state.user, action.payload],
        count: state.count + 1,
      };
    default:
      return state;  // Return the current state if no action matches
  }
};

const store = createStore(createReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addUser("sen"));


////////////////
const { createStore, combineReducers } = require("redux");

// defining constants
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";
const ADD_USER = "ADD_USER";
const GET_USER = "GET_USER";

// initial state
const initialState = {
  products: ["product one", "product two"],
  count: 2,
  users: ["user one", "user two"],
  userCount: 2,
};

// product reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        count: state.count + 1,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: state.products,
      };
    default:
      return state;
  }
};

// user reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        userCount: state.userCount + 1,
      };
    case GET_USER:
      return {
        ...state,
        users: state.users,
      };
    default:
      return state;
  }
};

// root reducer
const rootReducer = combineReducers({
  productState: productReducer,
  userState: userReducer,
});

// action creators
const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

const getProduct = () => {
  return {
    type: GET_PRODUCT,
  };
};

const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

const getUser = () => {
  return {
    type: GET_USER,
  };
};

// create store
const store = createStore(rootReducer);

// subscribe to store
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch actions
store.dispatch(addProduct("new product"));
store.dispatch(getProduct());
store.dispatch(addUser("new user"));
store.dispatch(getUser());



////
const {createStore, applyMiddleware} = require("redux");
const { default: logger } = require("redux-logger");


  const ADD_PRODUCT = "ADD_PRODUCT";
  const GET_PRODUCT = "GET_PRODUCT";

  const initialState = {
     products: ["product one", "product two"],
     count:2,  
  };

  const getProduct = () =>{
    return{
      type: GET_PRODUCT,
    };
  };

  const addproduct = (product) =>{
    return{
      type: ADD_PRODUCT,
      payload: product,
    };
  }


const productReducer = (state=initialState, action) =>{
  switch(action.type){
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        count: state.count + 1,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: state.products,
      };
    default:
      return state;
  }
}

const store = createStore(productReducer, applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addproduct("product three"));