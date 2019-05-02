import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPost,addPost} from './reduxAppConfig/Posts/PostsActions'
export class Posts extends Component {
  constructor(props){
    super(props);

    this.onPostsFetch=this.onPostsFetch.bind(this);
  }

  onPostsFetch(){
    this.props.onPostsFetch();
  }

  componentWillMount(){
    
    
    this.props.onPostsFetch();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
      this.props.postList.unshift(nextProps.newPost)
    }
   
  }

  render() {
    const postItems=this.props.postList.map(post=>(
          <li key={post.id}>

            <h3>{post.title}</h3>
            <p>{post.body}</p>

          </li>
    ));
    return (
       
            <div>
            
               <div>
             
              <h1>Posts</h1>
              <ul>
              {postItems}
              </ul>
              
            </div>
          </div>

    )
  }
}

function mapStateToProps(state){

  // console.log('mapStateToProps Postlis', state.post);
    return {
        postList:state.posts.postList,
        newPost:state.posts.newPost
      }
    };
const mapDispatchToProps={
  onPostsFetch:fetchPost


}


export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;