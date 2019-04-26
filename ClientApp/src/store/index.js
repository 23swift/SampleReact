import{createStore} from 'redux'

const initialState={
   posts:[]
}
const postReducer=(state=initialState,action)=>{

    console.log('reducer running',action);
    switch (action.type) {
        case 'FETCH_POSTS':
          fetch('https://jsonplaceholder.typicode.com/posts')
          .then(res=>res.json())
          .then(data=>{state.posts= data});

        default:
          return state
      }
    return state;
}
const store= createStore(postReducer);

export default store;