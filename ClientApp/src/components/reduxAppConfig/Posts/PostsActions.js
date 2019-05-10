export const FETCH_POST='posts:fetch';
export const REQUEST_FETCH_POST='posts:request';
export const FETCH_POST_RECIEVED='posts:recieved';
export const ADD_POST='posts:add';
export const DELETE_POST='delete:add';
export const ON_CHANGE_POST='post:onChange';
export const BIND_POST='post:bind';

export  const addPost = postData=>dispatch=>{
    dispatch({ type: REQUEST_FETCH_POST,payload:true })
    return    fetch('/api/Post/',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(postData)

    }).then(res=>res.json()).then(newPost=>{
                
            dispatch({
                    type:ADD_POST,
                    payload:{}
                })
                
                
            }
    );
    
}

export  const deletePost = postData=>dispatch=>{
    console.log(postData);
    dispatch({ type: REQUEST_FETCH_POST,payload:true })
    return    fetch('/api/Post/'+postData,{
        method:'DELETE',
        headers:{'content-type':'application/json'},
        // body:JSON.stringify({Id:postData})

    }).then(
        dispatch({
            type:DELETE_POST,
            payload:{
                isFetching:false
            }
        })
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
            
          })
          dispatch({ type:  FETCH_POST_RECIEVED, payload:false  })
    }, 2000);

   

      
    
     
   })
}
   

// export  function onBindPost(){

//     return{
//         type:BIND_POST,
//         payload:{
//             post:post
//         }
//     }

// }


