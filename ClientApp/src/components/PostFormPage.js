import React, { Component } from 'react'
import { Form,Field,Formik    } from 'formik';
import $ from 'jquery';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import {addPost,fetchPost} from './reduxAppConfig/Posts/PostsActions'
import {Button,CircularProgress,Grid } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import { TextField,TextAreaField } from 'formik-material-ui';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {main:'#1e4f8e'}
  },
});

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

export class PostFormPage extends  React.Component{
  constructor(props){
    super(props)
  //  console.log(this.props.addPost);
  }
  render(){
    return(
      
      
                
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
                    this.props.addPost(post).then(()=>{
                      this.props.fetchPost()  
                    }
                     
                    );
                    setSubmitting(false);
                    resetForm(); 
                  }, 3000);

                }}
                render={props => <PostFormik {...props} />} />

        
              );


  }
}

const isValidForm=(obj)=>{
  return $.isEmptyObject(obj);

}


const PostFormik = ({
 
  touched, errors,isSubmitting 
})=>{
  return(
      <Form>
        
        
            <Typography component="h4" variant="h4" gutterBottom color="primary">
              Add Post
            </Typography>
            <div className="form-group">
      
          {/* <label className={errors.title && touched.title?"text-danger":""} >Title</label> */}
              <Field type="text"  label="Title" component={TextField}  className={errors.title && touched.title?"form-control  is-invalid":"form-control"} name="title"   />
              {/* {errors.title && touched.title && <span className="invalid-feedback">{errors.title}</span>  } */}
          </div>
          <div className="form-group">
          <label className={errors.body && touched.body?"text-danger":""} >Body</label>
                <Field component={TextField} multiline className={errors.body && touched.body?"form-control  is-invalid":"form-control"}  name="body" />
                {/* {errors.body && touched.body && <span className="invalid-feedback">{errors.body}</span>  } */}
          </div>
          <div className="form-group">
                  <label>Date</label>
                
          </div>

            {isValidForm(errors) && !isSubmitting ?  
             <Button color="primary" variant="contained" type="submit" className="btn btn-primary">
               <span>Submit</span> 
            </Button> :
            
            <Button color="primary" variant="contained" className="btn btn-primary" disabled >
             {isSubmitting ? <span className="text-primary"><CircularProgress color="secondary"  /> Please wait...</span>: "Submit"}
            </Button> 
                     
           
            }
            
             
            <hr/>
       </Form>

)}




function mapStateToProps(state)
    {
       
        return{
            post:state.posts.post,
            isFetching:state.isFetching
            // post:state.posts.newPost
        }
          
  };

  const mapDispatchToProps={
   addPost:addPost,
   fetchPost:fetchPost
  
  }


export default  connect(mapStateToProps,mapDispatchToProps)(PostFormPage) 