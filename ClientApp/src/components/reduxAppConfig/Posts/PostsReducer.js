import {FETCH_POST,ADD_POST,REQUEST_FETCH_POST,FETCH_POST_RECIEVED,EDIT_POST} from './PostsActions'
const initialState={
    
          postList:[],
          post:{
            title:'',
            body:''
          },
          isFetching:false
      };

export default function PostsReducer(state=initialState,{type,payload}){

  
  switch (type) {
    case FETCH_POST:
        
      return {
        ...state,
        // postList:payload.postList,
        postList:payload,
        isFetching:false


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
          newPost:payload,
          isFetching:false
          

        };
     
        break;
        case EDIT_POST:
        return {
          ...state,
          newPost:payload,
          isFetching:false
          

        };
     
        break;
   

    default:
    return state;
  }
  
   
};