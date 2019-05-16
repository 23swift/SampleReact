import React, { Component } from 'react'
import { Form,Field,Formik    } from 'formik';
import $ from 'jquery';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import {addPost,fetchPost} from '../reduxAppConfig/Posts/PostsActions'
import {Button,CircularProgress } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import { TextField,TextAreaField } from 'formik-material-ui';
import signalRConnection from '../signalR/'


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

  sendData=()=>{
  
    signalRConnection.invoke("IncrementCounter").then(()=>{
       
    }).catch(function (err) {
       console.error(err.toString());
  });
    
  }
  

  render(){
   
    return(
      
      <div>
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

                <button className="btn btn-primary" onClick={this.sendData}>send to Server</button>

      </div>
                
               
        
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
        
        <div className="card">
      <div className="card-body">
      
      <Typography component="h4" variant="h4" gutterBottom color="primary">
              Add Post
            </Typography>
            <div className="form-group">
      
          {/* <label className={errors.title && touched.title?"text-danger":""} >Title</label> */}
              <Field  component={TextField} label="Title" fullWidth={true}  className={errors.title && touched.title?"is-invalid":""} name="title"   />
              {/* {errors.title && touched.title && <span className="invalid-feedback">{errors.title}</span>  } */}
          </div>
          <div className="form-group">
          {/* <label className={errors.body && touched.body?"text-danger":""} >Body</label> */}
                <Field component={TextField} fullWidth={true} label="Body" multiline rows="2" rowsMax="2"className={errors.body && touched.body?"is-invalid":""}  name="body" />
                {/* {errors.body && touched.body && <span className="invalid-feedback">{errors.body}</span>  } */}

              
          </div>
          
          <div className="form-group">
          
            <Button color="primary" variant="contained" type="submit" className="btn btn-primary" disabled= {isValidForm(errors) && !isSubmitting ? false :true} >
                {isSubmitting ? <span className="text-primary"> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Please wait...
              </span> : "Submit"}
          </Button> 
               

          
         
        </div>
            
          
      </div>
     
     
     
    </div>
             
            
       </Form>

)}




function mapStateToProps(state)
    {
       
        return{
            post:state.posts.post,
            isFetching:state.isFetching,
            hasNewPost:state.posts.hasNewPost,
            // post:state.posts.newPost
        }
          
  };

  const mapDispatchToProps={
   addPost:addPost,
   fetchPost:fetchPost
  
  }


export default  connect(mapStateToProps,mapDispatchToProps)(PostFormPage) 