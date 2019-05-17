import React, { Component } from 'react'
import $ from 'jquery';
import {connect} from 'react-redux'
import {fetchPost,deletePost,editPost} from '../reduxAppConfig/Posts/PostsActions'
import PostFormPageEdit from './PostFormPageEdit'
import {Button,IconButton ,Fab,Badge } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Message from '@material-ui/icons/Message';

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
                
     
      <IconButton aria-label="delete"  onClick={()=>this.onEditClicked(props.Id)}>
        <EditIcon  color="primary"/>
      </IconButton>
        <IconButton aria-label="delete"  onClick={()=>this.onDeleteClicked(props.Id)}>
        <DeleteIcon  color="secondary" />
      </IconButton>
         
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
            
               
                    <li className="list-group-item"  key={post.id}>        
                           
                            { this.state.mode=='edit' && this.state.id==post.id ? <PostFormPageEdit post={post} onCancelClicked={this.onCancelClicked}/>:  
                            <div className="p-1 mb-2">
                            <p className="float-right postDate text-black-50">Date: {post.dateCreated} </p>
                            <h5 className="card-title">{post.title}</h5>
                          
                            <p className="card-text">{post.body}</p></div>}


                          <div>
                              {
                                    
                                    this.state.mode=='delete' && this.state.id==post.id ? this.PostActionConfirmed({Id:post.id}): this.state.id!=post.id && this.PostAction({Id:post.id})
                            
                                }
                            </div>

                    </li>
              
            
          
            )
      )
  )}
  
  
  render() {
       
    return (
      <div>
           
            <div className="card">
              
               <div  className="card-body">
              
               <div className="postScroll">
               
               <ul className="list-group list-group-flush">
              
                      {this.props.isFetching && <div className="text-black-50">
                        <span className="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true"></span>
                        Loading please wait...
                      </div>}
                      {this.props.hasNewPost && <li className="list-group-item"> 
                     <IconButton onClick={()=>this.props.fetchPost()} className="float-right">
                     <Badge  badgeContent={4} color="primary" >
                        <Message color="secondary" />
                      </Badge>
                     </IconButton>
                      
                      </li>} 

                      {!this.props.isFetching && this.PostItems({postList:this.props.postList})}
                    </ul>
               </div>
               
            </div>
           
          </div>
      </div>
       

    )
  }
}




function mapStateToProps(state){


    return {
        postList:state.posts.postList,
        newPost:state.posts.newPost,
        isFetching:state.posts.isFetching,
        hasNewPost:state.posts.hasNewPost,
        

      }
    };

const mapDispatchToProps={
  fetchPost:fetchPost,
  deletePost:deletePost,
  editPost:editPost


}



export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;