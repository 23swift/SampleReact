import{combineReducers,createStore,applyMiddleware,compose} from 'redux'
import {composeWithDevTools} from '../../node_modules/redux-devtools-extension';
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
let composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'localhost',
  host: '172.23.210.174',
  port: 5000, // the port your remotedev server is running at
});
const store= createStore(allReducers,
  
          composeEnhancers(
            applyMiddleware(thunk)
          )
            
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  
  );


export default store;