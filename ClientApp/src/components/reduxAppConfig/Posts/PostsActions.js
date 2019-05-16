import axios from 'axios'
export const FETCH_POST='posts:fetch';
export const REQUEST_FETCH_POST='posts:request';
export const FETCH_POST_RECIEVED='posts:recieved';
export const ADD_POST='posts:add';
export const EDIT_POST='posts:edit';
export const DELETE_POST='delete:add';
export const ON_CHANGE_POST='post:onChange';
export const HAS_NEW_POST='post:hasNew';

export  const addPost = postData=>dispatch=>{
    dispatch({ type: REQUEST_FETCH_POST,payload:true })
    return    fetch('/api/Post/',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(postData)

    }).then(res=>res.json()).then(newPost=>{
                
            dispatch({
                    type:ADD_POST,
                    payload:{ }
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

//     // fetch('https://jsonplaceholder.typicode.com/posts')
//     fetch('/api/Post/GetAll')
//    .then(response => response.json())
//    .then(json => {
 
//     setTimeout(() => {
//         dispatch(
//             { type: FETCH_POST,
//                 payload:json.items
            
//           })
//           dispatch({ type:  FETCH_POST_RECIEVED, payload:false  })
//     }, 2000);

//    })

        axios.get('/api/Post/GetAll')
        .then(response => {
            // handle success
            // console.log(response);
            setTimeout(() => {
                dispatch(
                    { type: FETCH_POST,
                        payload:response.data.items
                    
                  })
                  dispatch({ type:  FETCH_POST_RECIEVED, payload:false  })
            }, 2000);
        })
        .catch(error=> {
            // handle error
            console.log(error);
        })
        // .finally(function () {
        //     // always executed
        // });
}
   

export const  editPost = postData=> dispatch=>{
    // dispatch({ type: REQUEST_FETCH_POST,payload:true })

   return axios.put('/api/Post/',postData);


    
}

export const  hasNewPost = ()=> dispatch=>{
    dispatch({ type: HAS_NEW_POST})

//    return axios.put('/api/Post/',postData);


    
}


