import React, { Component } from 'react'
import $ from 'jquery';
import {connect} from 'react-redux'
import {fetchPost,deletePost,editPost} from '../reduxAppConfig/Posts/PostsActions'
import PostFormPageEdit from './PostFormPageEdit'
import {Button,CircularProgress,Grid } from '@material-ui/core';



export class Posts extends Component {
  constructor(props){
    super(props);
   
    this.state={
        mode:'',
        id:0
    }
 
  }
  

  componentWillMount(){
    
   this.props.fetchPost();
  }

  
  onDeleteClicked=id=>{
      
      this.setState({...this.state,mode:'delete',id:id});
 
  }

  onEditClicked=id=>{
    
    this.setState({...this.state,mode:'edit',id:id});
}

onCancelClicked=()=>{
  this.setState({...this.state,mode:'',id:0});
}

  onNoClicked=id=>{
    console.log(id);
    this.setState({...this.state,mode:'',id:0});

    setTimeout(() => {
      console.log(this.state);

    },3000);
   
}

  PostAction=(props)=>{
    return(
      <div  className="float-right">
                
      <Button color="primary" variant="contained"  onClick={()=>this.onEditClicked(props.Id)}>Edit</Button>
        <Button color="secondary" variant="contained"  onClick={()=>this.onDeleteClicked(props.Id)} >Delete</Button>
         
    </div>
    
    )
  }

  PostActionConfirmed=(props)=>{
    return(
            <div className="p-2 mb-2 bg-primary text-dark rounded">

            <div className="row">
                <p className="col-md-6 text-light">Are you sure you want to delete this post?</p> 
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
    

  }


   
   PostItems=(props)=>{
   
    return(
          props.postList.map(post=>
            (
            
                  <div className="card"  key={post.id}>
                  
                    <div className="card-body">
                              
                              { (this.state.mode==''|| this.state.mode=='delete') && <div className="p-1 mb-2">
                                <p className="float-right postDate text-black-50">Date: {post.dateCreated} </p>
                                <h5 className="card-title">{post.title}</h5>
                              </div>
                            }
                        
                            { this.state.mode=='edit' && this.state.id==post.id ? <PostFormPageEdit post={post} onCancelClicked={this.onCancelClicked}/>:  
                            <p className="card-text">{post.body}</p>}


                          <div>
                              {
                                    
                                    this.state.mode=='delete' && this.state.id==post.id ? this.PostActionConfirmed({Id:post.id}): this.state.id!=post.id && this.PostAction({Id:post.id})
                            
                                }
                            </div>

                      </div>
                        
                  </div>
              
            
          
            )
      )
  )}
  
  
  render() {
       
    return (
       
            <div>
                
               <div>
             
              {this.props.isFetching ? <div className="text-black-50">
                <span className="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true"></span>
                Loading please wait...
              </div>: <h2>Posts</h2>}
              {!this.props.isFetching && this.PostItems({postList:this.props.postList})}
             
            </div>
           
          </div>

    )
  }
}




function mapStateToProps(state){


    return {
        postList:state.posts.postList,
        newPost:state.posts.newPost,
        isFetching:state.posts.isFetching

      }
    };

const mapDispatchToProps={
  fetchPost:fetchPost,
  deletePost:deletePost,
  editPost:editPost


}



export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;