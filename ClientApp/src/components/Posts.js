import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPost} from './reduxAppConfig/Posts/PostsActions'
export class Posts extends Component {
  constructor(props){
    super(props);
  
    // this.onPostsFetch=this.onPostsFetch.bind(this);

  }
  

  componentWillMount(){
    
   this.props.onPostsFetch();
  }
  componentWillReceiveProps(nextProps){
    
    if(nextProps.newPost){
      this.props.postList.unshift(nextProps.newPost)
    }
   
  }

  componentWillUpdate(){
    this.isLoading='Please wait';
  

  }
    componentDidUpdate(){
      this.isLoading='done';
      

    }
  
  render() {
    const postItems=this.props.postList.map(post=>(
          <li key={post.id}>

            <h3>{post.title}</h3>
            <p>{post.body}</p>

          </li>
    ));
// console.log( this.props.isFetching);
   
    return (
       
            <div>
                
               <div>
             
              <h1>Posts</h1>
                   {this.props.isFetching && <span><span className="spinner-grow spinner-grow-lg text-primary" role="status" aria-hidden="true"></span> Updating the list. Please wait...</span> }
             
              <ul>
              {postItems}
              </ul>
              
            </div>
          </div>

    )
  }
}

function mapStateToProps(state){

  // console.log('mapStateToProps Postlis', state.posts.isFetching);
    return {
        postList:state.posts.postList,
        newPost:state.posts.newPost,
        isFetching:state.posts.isFetching

      }
    };
const mapDispatchToProps={
  onPostsFetch:fetchPost


}


export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;