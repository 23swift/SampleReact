import React, { Component } from 'react'
import $ from 'jquery';
import {connect} from 'react-redux'
import {fetchPost,deletePost} from './reduxAppConfig/Posts/PostsActions'
export class Posts extends Component {
  constructor(props){
    super(props);
   
    this.state={
        deleteAction:'',
        id:0
    }
 
  }
  

  componentWillMount(){
    
   this.props.fetchPost();
  }

  
  onDeleteClicked=id=>{
      console.log(id);
      this.setState({...this.state,deleteAction:'delete',id:id});

      setTimeout(() => {
        console.log(this.state);

      },3000);
     
  }

  onNoClicked=id=>{
    console.log(id);
    this.setState({...this.state,deleteAction:'',id:0});

    setTimeout(() => {
      console.log(this.state);

    },3000);
   
}

  PostAction=(props)=>{
    return(
      <div  className="float-right">
                
      <button type="button" className="btn btn-primary btn-sm">Edit</button>
        <button type="button" className="btn btn-warning btn-sm text-dark" onClick={()=>this.onDeleteClicked(props.Id)} >Delete</button>
         
    </div>
    
    )
  }
  PostActionConfirmed=(props)=>{
    return(
            <div className="p-2 mb-2 bg-primary text-dark rounded">

            <div className="row">
                <p className="col-md-6 text-warning">Are you sure you want to delete this post?</p> 
                <div className="col-md-6">
                <div className="float-right">
                <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.deletePost(props.Id)}>Yes</button>
                    <button type="button" className="btn btn-light btn-sm" onClick={()=>this.onNoClicked()}>No</button>
                </div>
                
                </div>
            </div>
        </div>  

  )
}
   
  deletePost=(Id)=> {
     
    this.props.deletePost(Id).then(()=>{
      this.props.fetchPost()  
    });
    console.log('delete',Id);

  }
   
   PostItems=(props)=>{
    
    return(
      props.postList.map(post=>(
         
    <div className="card"  key={post.id}>
    
      <div className="card-body">
      
      <div class="p-1 mb-2 bg-warning text-dark rounded">
      <p className="float-right postDate text-black-50">Date: {post.dateCreated} </p>
      <h5 className="card-title text-primary">{post.title}</h5>
      </div>
              
              
              <p className="card-text">{post.body}</p>
              
                <div>
        
                    {
                      
                      this.state.deleteAction=='delete' && this.state.id==post.id ? this.PostActionConfirmed({Id:post.id}):this.PostAction({Id:post.id})
              
                  }
      
               
            </div>
        </div>
    
      </div>
  )))
  }
  
  render() {
    
// console.log( this.props.isFetching);
   
    return (
       
            <div>
                
               <div>
              
              <h2>Posts</h2>
            
              {this.props.isFetching && <p><p className="spinner-grow spinner-grow-lg text-primary" role="status" aria-hidden="true"></p> Updating the list. Please wait...</p> }
              {this.PostItems({postList:this.props.postList})}
             
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
  fetchPost:fetchPost,
  deletePost:deletePost


}



export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;