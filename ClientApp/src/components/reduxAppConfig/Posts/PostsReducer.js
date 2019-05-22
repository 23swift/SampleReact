import {FETCH_POST,ADD_POST,REQUEST_FETCH_POST,FETCH_POST_RECIEVED,EDIT_POST,HAS_NEW_POST,
  FETCH_PAGED_POST} from './PostsActions'
// "pageIndex":0,"pageSize":5,"totalCount":22,"totalPages":5,
const initialState={
    
          postList:{
            pageIndex:0,
            pageSize:5,
            totalPages:0,
            items:[]

          },
          post:{
            title:'',
            body:''
          },
          isFetching:false,
          hasNewPost:false,
          newPostCount:0,
          currentPost:{}
      };

export default function PostsReducer(state=initialState,{type,payload}){

  
  switch (type) {
    case FETCH_POST:
        
      return {
        ...state,
        // postList:payload.postList,
        postList:payload,
        isFetching:false,
        hasNewPost:false,
        newPostCount:0


      };
      break;
      
      case FETCH_PAGED_POST:
        
      return {
        ...state,
        // postList:payload.postList,
        postList:{...state.postList,
        pageIndex:payload.pageIndex,
            pageSize:payload.pageSize,
            totalPages:payload.totalPages,
            items:[...state.postList.items,...payload.items]
        },
        isFetching:false,
        hasNewPost:false,
        newPostCount:0


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
          hasNewPost:true,
          newPostCount:state.newPostCount+1
          

        };
     
        break;
   

    default:
    return state;
  }
  
   
};