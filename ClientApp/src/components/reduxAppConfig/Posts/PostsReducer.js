import {FETCH_POST,ADD_POST,ON_CHANGE_POST,BIND_POST} from './PostsActions'
const initialState={
    
   postList:[],
      post:{
        title:'',
        body:''
      }
      };

export default function PostsReducer(state=initialState,{type,payload}){

  
  switch (type) {
    case FETCH_POST:
    console.log(payload);
      return {
        ...state,
        postList:payload.postList

      };
      break;

    case ADD_POST:
      console.log(payload.posts);
      state.posts.push(
        {
          title:payload.title,body:payload.body
        }
      );
      return payload
        break;
      
    case ON_CHANGE_POST:
      // console.log(payload.post);
      
      return {
        ...state,
        post:payload.post

      };
        break;
        case BIND_POST:
      console.log(payload.post);
      
      return payload
        break;

    default:
    return state;
  }
  
   
};