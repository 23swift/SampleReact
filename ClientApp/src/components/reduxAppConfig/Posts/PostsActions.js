export const FETCH_POST='posts:fetch';
export const ADD_POST='posts:add';
export const ON_CHANGE_POST='post:onChange';
export const BIND_POST='post:bind';


export  function fetchPost(){

    return{
        type:FETCH_POST,
        payload:{
            postList:[
  
                {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                }
            ]
        }
    }

}
export  const addPost = postData=>dispatch=>{
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(postData)

    }).then(res=>res.json()).then(newPost=>{
        // console.log(newPost);
                dispatch({
                    type:ADD_POST,
                    payload:newPost
                })
            }
    );
    
}
export  function onChangePost(name,value){

    return{
        type:ON_CHANGE_POST,
        payload:{
            post:{[name]:value}
        }
    }

}

// export  function onBindPost(){

//     return{
//         type:BIND_POST,
//         payload:{
//             post:post
//         }
//     }

// }


