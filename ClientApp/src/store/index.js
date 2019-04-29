import{combineReducers,createStore} from 'redux'
import thunkMiddleware from 'redux-thunk';
import PostsReducer from '../components/reduxAppConfig/Posts/PostsReducer'
import UserReducer from '../components/reduxAppConfig/User/UserReducer'
export const fetchPosts = () => {
    return dispatch => {
        fetch('https://jsonplaceholder.typicode.com/posts')
       .then(response => response.json())
       .then(json => dispatch({ type: 'FETCH_POSTS', json }))
    }
   }


const allReducers=combineReducers({

  posts:PostsReducer,
  user:UserReducer
});
const store= createStore(allReducers
  ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

// console.log(store.getState());

// store.dispatch(updateUserAction);

export default store;