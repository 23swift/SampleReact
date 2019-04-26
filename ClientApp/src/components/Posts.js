import React, { Component } from 'react'
import PostForm from './PostForm'
import store from '../store/'

export class Posts extends Component {
  constructor(props){
    super(props);

    
  }

  componentWillMount(){
    console.log(store.getState());
    // fetch('https://jsonplaceholder.typicode.com/posts')
    // .then(res=>res.json())
    // .then(data=>this.setState({posts:data}));
  }
  render() {
    let items=store.getState();
  
    const postItems=items.posts.map(post=>(
      
          <li key={post.id}>

            <h3>{post.title}</h3>
            <p>{post.body}</p>

          </li>
      
      

    ));
    return (
      
            <div>
              <PostForm/>
              <h1>Posts</h1>
              <ul>
              {postItems}
              </ul>
              
            </div>
      
      
    )
  }
}


export default Posts;