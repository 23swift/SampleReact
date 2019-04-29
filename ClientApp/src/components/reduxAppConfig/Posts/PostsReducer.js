import {FETCH_POST,ADD_POST} from './PostsActions'

export default function PostsReducer(state=[],{type,payload}){

  console.log(FETCH_POST);
  switch (type) {
    case FETCH_POST:
    console.log(payload.posts);
    
    return payload.posts
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
  
    default:
    return state;
  }
  
   
};