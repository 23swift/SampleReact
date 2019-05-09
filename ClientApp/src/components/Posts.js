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

  showModal(){
    $('#exampleModalCenter').modal()
  }
  onDeleteClicked=id=>{
      console.log(id);
      this.setState({...this.state,deleteAction:'delete',id:id});

      setTimeout(() => {
        console.log(this.state);

      },3000);
     
  }
   deletePost=(Id)=> {
     
    this.props.deletePost(Id).then(()=>{
      this.props.fetchPost()  
    });
    console.log('delete',Id);

  }
   modal=(id)=>{
      return(

        <div className="modal fade" tabIndex="-1" id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Warning</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={()=>this.deletePost(id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      ) 
  }

  
  render() {
    const postItems=this.props.postList.map(post=>(
         
        <div className="card"  key={post.id}>
          <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  
                  <p className="card-text">{post.body}</p>
                  
            </div>

            <footer className="card-footer">
            
            <div className="row">
              <div className="col-md-4">
               <span>Date: {post.dateCreated} </span>
              </div>
              <div className="col-md-8">

                  <DeleteWarning/>
               <PostCardActioins deletePost={()=>this.deletePost(post.id)}/>

              </div>
            </div>
                    
                    
                  </footer>
          </div>
    ));
// console.log( this.props.isFetching);
   
    return (
       
            <div>
                
               <div>
              
              <h2>Posts</h2>
            
                   {this.props.isFetching && <span><span className="spinner-grow spinner-grow-lg text-primary" role="status" aria-hidden="true"></span> Updating the list. Please wait...</span> }
             
             
              { postItems}
             
              
            </div>
            {this.modal(this.state.id)}
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


const DeleteWarning=(postId)=>{

    return(
              <div className="alert alert-warning row" role="alert">
              <span className="col-md-6">Are you sure you want to delete this post?</span> 
              <div className="col-md-6">
              <div className="float-right">
                  <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.deletePost(postId)}>Yes</button>
                  <button type="button" className="btn btn-light btn-sm">No</button>
              </div>
                  
              </div>
          </div>  
      
    )
}

const PostCardActioins=(props)=>{

  return(
    <div  className="float-right">
              
    <button type="button" className="btn btn-primary btn-sm">Edit</button>
      <button type="button" className="btn btn-warning btn-sm" onClick={props.deletePost} >Delete</button>
       
</div>

)

}
export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;