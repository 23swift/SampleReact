import React, { Component } from 'react'
import {connect} from 'react-redux'
import {onChangePost,onBindPost} from './reduxAppConfig/Posts/PostsActions'

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
    //   componentWillMount(){
    
      
    //     // this.props.onBindPost();
    //   }
    onChange=(e)=>{

        // this.setState({[e.target.name]:e.target.value});
        this.props.onChangePost({[e.target.name]:e.target.value});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(JSON.stringify(this.state));
        const post={

            title:this.state.title,
            body:this.state.body
        };

        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(post)

        }).then(res=>res.json()).then(data=>
            console.log(data)
        );

    }
  render() {
     console.log(this.props.post);
    return (
      <div>
            <h1>Add Post</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text"  className="form-control" name="title" value={this.props.post.title} onChange={this.onChange}/>

                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea  className="form-control" name="body" value={this.props.post.body} onChange={this.onChange}/>

                </div>
            <button className="btn btn-primary">Submit</button>
            </form>
        <hr/>
      </div>
    )
  }
}
const mapStateToProps=state=>(
    {
          post:state.posts.post
  });

  const mapDispatchToProps={
    onChangePost:onChangePost,
    // onBindPost:onBindPost
  
  
  }

  export default connect(mapStateToProps,mapDispatchToProps)(PostForm) 