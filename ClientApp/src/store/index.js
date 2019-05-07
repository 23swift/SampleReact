import{combineReducers,createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import PostsReducer from '../components/reduxAppConfig/Posts/PostsReducer'
import UserReducer from '../components/reduxAppConfig/User/UserReducer'
export const fetchPosts = () => {
    return dispatch => {
        fetch('https://jsonplaceholder.typicode.com/posts')
       .then(response => response.json())
       .then(json => dispatch({ type: 'FETCH_POSTS', json }))
    }
   }

const initialState={}
const allReducers=combineReducers({

  posts:PostsReducer,
  user:UserReducer
});
const store= createStore(allReducers,
  
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  
  );


export default store;