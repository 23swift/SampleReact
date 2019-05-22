import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchPost,fetchPagedPost,deletePost,editPost} from '../reduxAppConfig/Posts/PostsActions'
import {PostEditForm} from './PostFormEdit'
import {IconButton ,Badge} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Message from '@material-ui/icons/Message';
import {CSSTransition,TransitionGroup}  from 'react-transition-group'; // ES6
import InfiniteScroll from 'react-infinite-scroll-component';


export class Posts extends Component {
  constructor(props){
    super(props);
   
    this.state={
        mode:'',
        id:0,
        showDeleteConfirm:false,
        showActionButtons:true,
        showEditForm:false,
        showItem:true,
        
    }
    
 
  }
  
  componentWillMount(){
    
   this.props.fetchPost();
  }

  
  onDeleteClicked=id=>{
    this.setState({...this.state,showDeleteConfirm:true,id:id});
    
     
  }

  onEditClicked=id=>{
  
    this.setState({...this.state,showEditForm:true,id:id});
}

onCancelClicked=()=>{
  this.setState({...this.state,showEditForm:false});
}

  onNoClicked=()=>{
    
    
    this.setState({...this.state,showDeleteConfirm:false,id:0});
    
    
   
}

      editPost=(post)=>{
        
          this.props.editPost(post).then(response=>{
          this.props.fetchPost()  
          
          }).catch(error=>{
                  console.log(error);
                  // this.onCancelClickedFn();
                  this.setState({...this.state,showError:true})

              
          }).finally(()=>{
            
            this.setState({...this.state,showEditForm:false,id:0})
          });

      
}
  deletePost=(id)=> {
    
    this.props.deletePost(id).then(()=>{
      
      this.props.fetchPost();
      this.setState({...this.state,showDeleteConfirm:false});
    });
   
    

  }

getNewposts=()=>{

  this.props.fetchPost()  
}

fetchPagedPost=()=>{
  let newPageIndex=this.props.postList.pageIndex<this.props.postList.totalPages ? this.props.postList.pageIndex+1:0;
 
  
  this.props.fetchPagedPost(newPageIndex,3);
}
  /////////////////////////////////////////////////////// 
  PostItems=(props)=>{
     
     
   let ItemList=( 
   
    props.postList.items.map(post=>
           (
         
                  <CSSTransition
                  key={post.id}
                  timeout={500}
                  classNames="item"
                >
                <li className="list-group-item"  key={post.id}>        
                                                          
                          
                          <div>
                                      { this.state.showDeleteConfirm || this.state.id!=post.id ? <PostItem post={post}/>:""}
                              
                                      
                                      <CSSTransition
                                      in={this.state.showEditForm && this.state.id==post.id}
                                      timeout={300}
                                      classNames="alert"
                                      unmountOnExit
                                      onEnter={() => this.setState({...this.state,showItem:false})}
                                      onExited={() =>  this.setState({...this.state,showActionButtons:true,showItem:true,id:0})}
                                  >
                                    <PostEditForm  post={post} editPost={this.editPost} handleCancel={this.onCancelClicked}/>
                                  </CSSTransition>

                            
                            </div>
                            <div className="row">
                              <div className="col-md-12 px-1 mx-1">

                              <CSSTransition in={this.state.showDeleteConfirm && this.state.id==post.id}
                              timeout={300} classNames="alert"  unmountOnExit
                                onEnter={() => this.setState({...this.state,showActionButtons:false})}
                                onExited={() =>  this.setState({...this.state,showActionButtons:true})}
                              >
                                        <PostActionConfirmed id={post.id} onNoClicked={this.onNoClicked} deletePost={()=>this.deletePost(post.id)}/>
                              </CSSTransition>

                            { this.state.showActionButtons && this.state.id!=post.id ? <PostAction onEditClicked={()=>this.onEditClicked(post.id)} onDeleteClicked={()=>this.onDeleteClicked(post.id)}/>:""}
                                
                              </div>
                            </div>

                    </li>
              </CSSTransition>


             
           
         
           )
     )
 );

    return(
                  <InfiniteScroll
                    dataLength={this.props.postList.items.length}
                    height={750}
                    // scrollThreshold="500px"
                    next={this.fetchPagedPost}
                    hasMore={this.props.postList.pageIndex<this.props.postList.totalPages}
                    loader={<span className="text-primary"> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading please wait...
                  </span> }
                  >
                      <TransitionGroup>
                                          {ItemList}
                      </TransitionGroup>
                         
                  </InfiniteScroll>

  )
}
 ////////////////////////////////////////////////////////
  
  render() {
       
    return (
      <div>
           
            <div className="card">
              <div className="card-title">
              <CSSTransition in={this.props.hasNewPost}
                                  timeout={300} classNames="alert"  unmountOnExit
                                    onEnter={() => this.setState({...this.state,showActionButtons:false})}
                                    onExited={() =>  this.setState({...this.state,showActionButtons:true})}
                                  >
                                  
                                
                                  <IconButton onClick={()=>this.props.fetchPost()} className="float-right">
                                        <Badge  badgeContent={this.props.newPostCount} color="primary" >
                                            <Message color="secondary" />
                                          </Badge>
                                        </IconButton>
                                
                                          
                                  </CSSTransition>
                {this.props.isFetching &&  <div className="text-black-50">
                        <span className="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true"></span>
                        Please wait...
                      </div>}
              </div>
               <div  className="card-body">
              
                     
                            <ul className="list-group list-group-flush">
                                

                            {this.PostItems({postList:this.props.postList})}
                            </ul>
  
            </div>
           
          </div>
      </div>
       

    )
  }
}

const PostItem=(props)=>{
  return(
    <div className="p-1 mb-2">
                        <p className="float-right postDate text-black-50">Date: {props.post.dateCreated} </p>
                        <h5 className="card-title">{props.post.title}</h5>
                      
                        <p className="card-text">{props.post.body}</p></div>
  );
}

const PostAction=(props)=>{
    
  return(
   
    <div  className="float-right">
              
   
    <IconButton aria-label="edit"  onClick={()=>props.onEditClicked()}>
      <EditIcon  color="primary"/>
    </IconButton>
      <IconButton aria-label="delete"  onClick={()=>props.onDeleteClicked()}>
      <DeleteIcon  color="secondary" />
    </IconButton>
       
  </div> 
  
  )
}

const PostActionConfirmed=(props)=>{
    
  return(
   
          <div className="p-2 mb-2 bg-primary text-dark rounded">

            <div className="row">
                <p className="col-md-6 text-light">Are you sure you want to delete this post?</p> 
                <div className="col-md-6">
                <div className="float-right">
                <button type="button" className="btn btn-primary btn-sm" onClick={()=>props.deletePost(props.id)}>Yes</button>
                    <button type="button" className="btn btn-light btn-sm" onClick={props.onNoClicked}>No</button>
                </div>
                
                </div>
            </div>
        </div>  
    
         

)
}

function mapStateToProps(state){


    return {
        postList:state.posts.postList,
        newPost:state.posts.newPost,
        isFetching:state.posts.isFetching,
        hasNewPost:state.posts.hasNewPost,
        newPostCount:state.posts.newPostCount

      }
    };

const mapDispatchToProps={
  fetchPost:fetchPost,
  deletePost:deletePost,
  editPost:editPost,
  fetchPagedPost:fetchPagedPost


}



export default connect(mapStateToProps,mapDispatchToProps)(Posts) ;