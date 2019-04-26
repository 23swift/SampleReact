import React, { Component } from 'react'

export default class PostForm extends Component {
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

        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(post)

        }).then(res=>res.json()).then(data=>
            console.log(data)
        );

    }
  render() {

    return (
      <div>
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
