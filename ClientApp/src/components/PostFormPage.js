import React, { Component } from 'react'
import { Form,Field,Formik    } from 'formik';
import $ from 'jquery';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import {addPost} from './reduxAppConfig/Posts/PostsActions'

const SignupSchema=Yup.object().shape({
  title:Yup.string()
  .min(2,"Minimum of two Characters")
  .max(20,"Maximum of 20 Characters")
  .required('Title is Required'),
  body:Yup.string()
  .required('body is Required')
  // password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { excludeEmptyString: true,message:"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" })
  .max(50,"Maximum of 50 Characters")

});

export class PostFormPage extends  React.Component{
  constructor(props){
    super(props)
  //  console.log(this.props.addPost);
  }
  render(){
    return(
                // <Formik component={PostFormik} />
                <Formik validationSchema={SignupSchema}  initialValues={this.props.post} 
                
                
                
                onSubmit={(values, { setSubmitting,resetForm }) => {
                  // same shape as initial values
                  setSubmitting(true);
                  
                  const post={

                    title:values.title,
                    body:values.body
                };
                  setTimeout(() => {
                    // console.log(post);
                    this.props.addPost(post);
                    setSubmitting(false);
                    resetForm(); 
                  }, 3000);

                }}
                render={props => <PostFormik {...props} />} />
              );


  }
}


const PostFormik = ({
 
  touched, errors,isSubmitting 
})=>{
  return(
      <Form>
        <h1>Add Post</h1>

            <div className="form-group">
      
          <label className={errors.title && touched.title?"text-danger":""} >Title</label>
              <Field type="text"  className={errors.title && touched.title?"form-control  is-invalid":"form-control"} name="title"   />
              {errors.title && touched.title && <span className="invalid-feedback">{errors.title}</span>  }
          </div>
          <div className="form-group">
          <label className={errors.body && touched.body?"text-danger":""} >Body</label>
                <Field component="textarea" className={errors.body && touched.body?"form-control  is-invalid":"form-control"}  name="body" />
                {errors.body && touched.body && <span className="invalid-feedback">{errors.body}</span>  }
          </div>
          
            <button type="submit" className="btn btn-primary" disabled={isValidForm(errors) && !isSubmitting ? "":"disabled"}>
              
              {isSubmitting ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait...</span>: "Submit"}
            </button>
    
       </Form>

)}


const isValidForm=(obj)=>{
  return $.isEmptyObject(obj);

}


function mapStateToProps(state)
    {
       
        return{
            post:state.posts.post,
            isFetching:state.isFetching
            // post:state.posts.newPost
        }
          
  };

  const mapDispatchToProps={
   addPost:addPost
  
  
  }


export default  connect(mapStateToProps,mapDispatchToProps)(PostFormPage) 