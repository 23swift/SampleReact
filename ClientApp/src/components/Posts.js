import React, { Component } from 'react'
import PostForm from './PostForm'
import {store} from '../store/'

class Posts extends Component {
  constructor(props){
    super(props);

    // this.state={
    //   posts:[]
    // }

  }

  componentWillMount(){

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res=>res.json())
    .then(data=>this.setState({posts:data}));
  }
  render() {
    const postItems=this.props.posts.map(post=>(
      
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