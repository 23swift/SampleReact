import React, { Component } from 'react'
import { Form,Field,Formik    } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import $ from 'jquery';
const SignupSchema=Yup.object().shape({
    title:Yup.string()
    .min(2,"Minimum of two Characters")
    .max(20,"Maximum of 20 Characters")
    .required('Title is Required'),
    body:Yup.string()
    .required('body is Required')
    // password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { excludeEmptyString: true,message:"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" })
    .max(500,"Maximum of 500 Characters")
  
  });

const PostFormPageEdit=(props)=> {
    
    let onCancelClickedFn=props.onCancelClicked
        return(
                <Formik validationSchema={SignupSchema}  initialValues={props.post} 
                onSubmit={(values, { setSubmitting,resetForm }) => {
                setSubmitting(true);

                const post={
                    title:values.title,
                    body:values.body
                };

                setTimeout(() => {
                    props.addPost(post).then(()=>{
                    props.fetchPost()  
                    }
                    
                    );
                    setSubmitting(false);
                    resetForm(); 
                }, 3000);

                }}
                render={props => PostFormik ({...props,onCancelClicked:onCancelClickedFn}) } />
            );


    
}
const PostFormik = (props)=>{

    return(
        <Form>
          <div className="p-1 mb-3 bg-warning text-dark rounded">
          <h5>Edit Post</h5>
          </div>
          
          
              <div className="form-group">
        
            <label className={props.errors.title && props.touched.title?"text-danger":""} >Title</label>
                <Field type="text"  className={props.errors.title && props.touched.title?"form-control  is-invalid":"form-control"} name="title"   />
                {props.errors.title && props.touched.title && <span className="invalid-feedback">{props.errors.title}</span>  }
            </div>
            <div className="form-group">
            <label className={props.errors.body && props.touched.body?"text-danger":""} >Body</label>
                  <Field component="textarea" className={props.errors.body && props.touched.body?"form-control  is-invalid":"form-control"}  name="body" />
                  {props.errors.body && props.touched.body && <span className="invalid-feedback">{props.errors.body}</span>  }
            </div>
            <hr/>
            <div className="float-right">
            <button type="submit" className="btn btn-primary btn-sm" disabled={isValidForm(props.errors) && !props.isSubmitting ? "":"disabled"}>
                
                {props.isSubmitting ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait...</span>: "Submit"}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={()=>props.onCancelClicked()}>Cancel</button>
            </div>
              
           
         </Form>
  
  )}
  const isValidForm=(obj)=>{
    return $.isEmptyObject(obj);
  
  }
  
export default PostFormPageEdit
