import React, { Component } from 'react'
import PostForm from './PostForm'



import {connect} from 'react-redux'

import {fetchPost,addPost} from './reduxAppConfig/Posts/PostsActions'
export class Posts extends Component {
  constructor(props){
    super(props);

    // this.state={
    //   posts:[]
    // }
console.log(this.props.posts);
    this.onPostsFetch=this.onPostsFetch.bind(this);
  }


  onPostsFetch(){
    this.props.onPostsFetch();
  }

  componentWillMount(){
    
    // fetch('https://jsonplaceholder.typicode.com/posts')
    // .then(res=>res.json())
    // .then(data=>this.setState({posts:data}));

    // console.log(this.props.posts);
    this.props.onPostsFetch();
  }
  render() {
    // let items=store.getState();
  
    const postItems=this.props.posts.map(post=>(
      
          <li key={post.id}>

            <h3>{post.title}</h3>
            <p>{post.body}</p>

          </li>
      
      

    ));
    return (
       
            <div>
            
               <div>
              <PostForm/>
              <h1>Posts</h1>
              {/* <button className="btn btn-primary" onClick={this.onPostsFetch}>
                  Load Post
            </button> */}
              <ul>
              {postItems}
              </ul>
              
            </div>
          </div>
       
          
  
            
   
           
      
      
    )
  }
}

const mapStateToProps=state=>(
  {
        posts:state.posts
});
const mapDispatchToProps={
  onPostsFetch:fetchPost


}


export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;