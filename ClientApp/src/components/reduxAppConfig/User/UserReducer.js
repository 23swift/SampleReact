import {UPDATE_USER} from './UserAction'

export default function UserReducer(state='arnold',{type,payload}){
// console.log(UPDATE_USER);
    switch (type) {
      case UPDATE_USER:
      console.log(UPDATE_USER);
      
      return payload.user
        break;
    
      default:
      return state;
    }
    
  }
  