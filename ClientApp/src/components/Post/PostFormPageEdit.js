import React, { Component } from 'react'
import { Form,Field,Formik    } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import $ from 'jquery';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';
import {Button,Snackbar,IconButton   } from '@material-ui/core';
import {editPost,fetchPost} from '../reduxAppConfig/Posts/PostsActions'
import Notification from '../Notification/notification'

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

class PostFormPageEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showError: false,
          };
    }
    
     onCancelClickedFn=this.props.onCancelClicked

     handleClose = () => {
        this.setState({...this.state, showError: false });
      };

    render(){
        return(
            <div>
                          <Formik validationSchema={SignupSchema}  initialValues={this.props.post} 
            onSubmit={(values, { setSubmitting,resetForm }) => {
            setSubmitting(true);

            const post={
                id:values.id,
                title:values.title,
                body:values.body
            };

            setTimeout(() => {
                this.props.editPost(post).then(response=>{
                this.props.fetchPost()  
                
               
                // resetForm(); 
                this.props.onCancelClicked();
                }).catch(error=>{
                        console.log(error);
                        // this.onCancelClickedFn();
                        this.setState({...this.state,showError:true})

                       
                }).finally(()=>{
                    setSubmitting(false);
                });
               
            }, 3000);

            }}
            render={props => PostFormik ({...props,onCancelClicked:this.onCancelClickedFn,showError:this.state.showError}) }
             />
            <ErrorSnackbar open={this.state.showError} onClose={this.handleClose}/>
            </div>
          
        );

    }
      


    
}   

const PostFormik = (props)=>{

    return(
     
        <Form>
                        
        <div className="card">
        <div className="card-body">

        <Typography component="h5" variant="h5" gutterBottom color="primary">
            Update Post
            </Typography>
            <div className="form-group">

        {/* <label className={errors.title && touched.title?"text-danger":""} >Title</label> */}
            <Field  component={TextField} label="Title" fullWidth={true} className={props.errors.title && props.touched.title?"is-invalid":""} name="title"   />
            {/* {errors.title && touched.title && <span className="invalid-feedback">{errors.title}</span>  } */}
        </div>
        <div className="form-group">
        {/* <label className={errors.body && touched.body?"text-danger":""} >Body</label> */}
                <Field component={TextField} fullWidth={true}label="Body" multiline rows="2" rowsMax="2"className={props.errors.body && props.touched.body?"is-invalid":""}  name="body" />
                {/* {errors.body && touched.body && <span className="invalid-feedback">{errors.body}</span>  } */}

            
        </div>
        
        <div className="form-group">
        
            <Button color="primary" variant="contained" type="submit" className="btn btn-primary" disabled= {isValidForm(props.errors) && !props.isSubmitting ? false :true} >
                {props.isSubmitting ? <span className="text-primary"> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Please wait...
            </span> : "Submit"}
        </Button> 
        {!props.isSubmitting && <Button color="secondary" variant="contained" className="btn btn-secondary btn-sm" onClick={()=>props.onCancelClicked()}>Cancel</Button>}

        
        
        </div>
            
        
        </div>



        </div>
     
        
        </Form>
             
  
  )}
  
  const action = (
    <Button color="secondary" size="small">
      lorem ipsum dolorem
    </Button>
  );
const ErrorSnackbar=(props)=>{
    
    return(

        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' } }
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={5000}
        >
            <Notification variant="error" onClose={props.onClose}   message="An error has occured!" />
      </Snackbar>
    )
}
  const isValidForm=(obj)=>{
    return $.isEmptyObject(obj);
  
  }
  
  

  function mapStateToProps(state)
    {
       
        return{
            // post:state.posts.post,
            isFetching:state.isFetching
            // post:state.posts.newPost
        }
          
  };

  const mapDispatchToProps={
   editPost:editPost,
   fetchPost:fetchPost
  
  }

export default connect(mapStateToProps,mapDispatchToProps) (PostFormPageEdit)