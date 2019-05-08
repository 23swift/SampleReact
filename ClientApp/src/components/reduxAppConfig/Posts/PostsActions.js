export const FETCH_POST='posts:fetch';
export const REQUEST_FETCH_POST='posts:request';
export const FETCH_POST_RECIEVED='posts:recieved';
export const ADD_POST='posts:add';
export const ON_CHANGE_POST='post:onChange';
export const BIND_POST='post:bind';


// export  function fetchPost(){

//     return{
//         type:FETCH_POST,
//         payload:{
//             isFetching:true,
//             postList:[
  
//                 {
//                 "userId": 1,
//                 "id": 1,
//                 "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//                 "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//                 },
//                 {
//                 "userId": 1,
//                 "id": 2,
//                 "title": "qui est esse",
//                 "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//                 }
//             ]
//         }
//     }

// }
export  const addPost = postData=>dispatch=>{
    dispatch({ type: REQUEST_FETCH_POST,payload:true })
    // fetch('https://jsonplaceholder.typicode.com/posts',{
        fetch('/api/Post/',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(postData)

    }).then(res=>res.json()).then(newPost=>{
        console.log(newPost);
        
                dispatch({
                    type:ADD_POST,
                    payload:{}
                })
                // dispatch({ type:  FETCH_POST_RECIEVED, payload:false  })
                
            }
    );
    
}

export const fetchPost = ()=> dispatch=> {

        dispatch({ type: REQUEST_FETCH_POST,payload:true })

        // fetch('https://jsonplaceholder.typicode.com/posts')
        fetch('/api/Post/GetAll')
       
       .then(response => response.json())
       .then(json => {

        setTimeout(() => {
            dispatch(
                { type: FETCH_POST,
                    payload:json.items 
                
              }
            )
            dispatch({ type:  FETCH_POST_RECIEVED, payload:false  })
          }, 3000);
          
         
       }
        
        )
    }
   

// export  function onBindPost(){

//     return{
//         type:BIND_POST,
//         payload:{
//             post:post
//         }
//     }

// }


