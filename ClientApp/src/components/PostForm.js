import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPost} from './reduxAppConfig/Posts/PostsActions'
import { Form,Field,withFormik    } from 'formik';
import $ from 'jquery';
import * as Yup from 'yup';
export class PostForm extends Component {
    constructor(props){
        super(props);
    
        this.state={
          title:"",
          body:""
        }
            this.onChange=this.onChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
      }
   
    onChange=(e)=>{

        this.setState({[e.target.name]:e.target.value});
        
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(JSON.stringify(this.state));
        const post={

            title:this.state.title,
            body:this.state.body
        };

       
        this.props.addPost(post);

    }
  

  render() {
     console.log(this.props);
    
    return (
      <div>
          <PostFormPage addPost={this.props.addPost} />
            <h1>Add Post</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text"  className="form-control" name="title" value={this.state.title} onChange={this.onChange}/>

                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea  className="form-control" name="body" value={this.state.body} onChange={this.onChange}/>

                </div>
            <button className="btn btn-primary">Submit</button>
            </form>
        <hr/>
      </div>
    )
  }
}
function mapStateToProps(state)
    {
        // console.log('mapStateToProps',state.posts.newPost);
        return{
            post:state.posts.newPost
        }
          
  };

  const mapDispatchToProps={
   addPost:addPost
  
  
  }

 

  export default connect(mapStateToProps,mapDispatchToProps)(PostForm) 