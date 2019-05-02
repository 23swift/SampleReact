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
   
      return {
        ...state,
        postList:payload.postList

      };
      break;

    case ADD_POST:
        return {
          ...state,
          newPost:payload

        };
     
      return payload
        break;
      
    case ON_CHANGE_POST:
      // console.log(payload.post);
      
      return {
        ...state,
        ...state.post,
        post:payload.post

      };
        break;
        case BIND_POST:
    
      
      return payload
        break;

    default:
    return state;
  }
  
   
};