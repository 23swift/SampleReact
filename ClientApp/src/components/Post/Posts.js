import React, { Component } from 'react'
import $ from 'jquery';
import {connect} from 'react-redux'
import {fetchPost,deletePost,editPost} from '../reduxAppConfig/Posts/PostsActions'
import PostFormPageEdit from './PostFormPageEdit'
import {Button,IconButton ,Fab,Badge, LinearProgress } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Message from '@material-ui/icons/Message';
import {CSSTransition,TransitionGroup}  from 'react-transition-group'; // ES6
export class Posts extends Component {
  constructor(props){
    super(props);
   
    this.state={
        mode:'',
        id:0,
        showDeleteConfirm:false,
        showActionButtons:true
    }
    
 
  }
  

  componentWillMount(){
    
   this.props.fetchPost();
  }

  
  onDeleteClicked=id=>{
    this.setState({...this.state,showDeleteConfirm:true,id:id,showActionButtons:false});
    
      
      console.log('current Id:',id);
      
 
  }

  onEditClicked=id=>{
    
    this.setState({...this.state,mode:'edit',id:id});
}

onCancelClicked=()=>{
  this.setState({...this.state,mode:'',id:0});
}

  onNoClicked=id=>{
    
    
    this.setState({...this.state,showDeleteConfirm:false,id:id});
    
    
   
}

  PostAction=(props)=>{
    
    
    return(
      this.state.showActionButtons && 
      <div  className="float-right">
                
     
      <IconButton aria-label="delete"  onClick={()=>this.onEditClicked(props.id)}>
        <EditIcon  color="primary"/>
      </IconButton>
        <IconButton aria-label="delete"  onClick={()=>this.onDeleteClicked(props.id)}>
        <DeleteIcon  color="secondary" />
      </IconButton>
         
    </div> 
    
    )
  }

  PostActionConfirmed=(props)=>{
    
    return(
      <CSSTransition
        in={this.state.showDeleteConfirm && this.state.id==props.id}
        timeout={300}
        classNames="alert"
        unmountOnExit
        // onEnter={() => this.setState({...this.state,mode:''})}
        onExited={() =>  this.setState({...this.state,showActionButtons:true})}
      >
            <div className="p-2 mb-2 bg-primary text-dark rounded">

              <div className="row">
                  <p className="col-md-6 text-light">Are you sure you want to delete this post?</p> 
                  <div className="col-md-6">
                  <div className="float-right">
                  <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.deletePost(props.id)}>Yes</button>
                      <button type="button" className="btn btn-light btn-sm" onClick={()=>this.onNoClicked()}>No</button>
                  </div>
                  
                  </div>
              </div>
          </div>  
      </CSSTransition>
           

  )
}
   
  deletePost=(id)=> {
    this.setState({...this.state,showDeleteConfirm:false});
    this.props.deletePost(id).then(()=>{
      
      this.props.fetchPost()  
    });
    

  }


   
   PostItems=(props)=>{
   
    return(
      <TransitionGroup className="todo-list">
         { props.postList.map(post=>
                (
                  <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="item"
                  >
                  <li className="list-group-item"  key={post.id}>        
                                  
                              { this.state.mode=='edit' && this.state.id==post.id ? <PostFormPageEdit post={post} onCancelClicked={this.onCancelClicked}/>:  
                              <div className="p-1 mb-2">
                              <p className="float-right postDate text-black-50">Date: {post.dateCreated} </p>
                              <h5 className="card-title">{post.title}</h5>
                            
                              <p className="card-text">{post.body}</p></div>}


                            <div>
                               
                              </div>
                              <div className="row">
                                <div className="col-md-12 px-1 mx-1">
                                {this.PostActionConfirmed({id:post.id})}
                                {this.PostAction({id:post.id})}
                                  
                                </div>
                              </div>

                      </li>
            </CSSTransition>
                  
                       
                  
                
              
                )
          )}
      </TransitionGroup>
         
  )
}
  
  
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

                      {this.PostItems({postList:this.props.postList})}
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