import {FETCH_POST,ADD_POST,REQUEST_FETCH_POST,FETCH_POST_RECIEVED,EDIT_POST,HAS_NEW_POST} from './PostsActions'
const initialState={
    
          postList:[],
          post:{
            title:'',
            body:''
          },
          isFetching:false,
          hasNewPost:false
      };

export default function PostsReducer(state=initialState,{type,payload}){

  
  switch (type) {
    case FETCH_POST:
        
      return {
        ...state,
        // postList:payload.postList,
        postList:payload,
        isFetching:false,
        hasNewPost:false


      };
      break;
      case REQUEST_FETCH_POST:
        
      return {
        ...state,
        // postList:payload.postList,
        isFetching:true

      };
      break;
      case FETCH_POST_RECIEVED:
        
      return {
        ...state,
        // postList:payload.postList,
        isFetching:false


      };
      break;
    case ADD_POST:
        return {
          ...state,
          // newPost:payload,
          isFetching:false,
          hasNewPost:payload.hasNewPost
          

        };
     
        break;
        case EDIT_POST:
        return {
          ...state,
          newPost:payload,
          isFetching:false
          

        };
        case HAS_NEW_POST:
        return {
          ...state,
          hasNewPost:true
          

        };
     
        break;
   

    default:
    return state;
  }
  
   
};