import React, { Component,useState  } from 'react'
import { ValidateEmployeeForm } from './Validation';
import{isFormValid } from './Validation';
import {InputField} from '../formElements/inputField/InputField';

export  class EmployeeForm extends React.Component {
    constructor(props) {
      super(props);
     
      // const [formModel,setformModel]=setState({
      //   firstName: null,
      //   lastName: null,
      //   address:null

      // });
    //   this.state = {form: formControl};
   
    this.state = {
        firstName: null,
        lastName: null,
        address:null,
        phoneNumber:null,
        formErrors:{
          firstName:"",
          lastName:"",
          address:"",
          phoneNumber:""
        },
        validForm:false

    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.validateName=this.validateName.bind(this);;
    }
  
    handleChange = event => {
      event.preventDefault();
        const {name,value} = event.target;
        
        this.setState({[name]:value});
        
       
      let formErrors= this.state.formErrors;
     ValidateEmployeeForm(name,value,formErrors);  
      this.setState({formErrors,[name]:value});
     
      this.setState({validForm:isFormValid(this.state.formErrors)});
      
    }
  
  
    handleSubmit=event=> { 
      if(!isFormValid(this.state.formErrors)){
        alert("Invalid form");
      }else{
        alert("Valid form");
      }
      console.log(this.state);
      event.preventDefault();
    }
onChange = date => this.setState({ date })

   
    render() {
    const {formErrors}=this.state;
    const {validForm}=this.state;
    return (
       
        <form onSubmit={this.handleSubmit} noValidate>
        <h1>test</h1>
          
            <InputField label="First Name" name="firstName" formErrors={formErrors} onChangeFn={this.handleChange}/>
            <InputField label="Last Name" name="lastName" formErrors={formErrors} onChangeFn={this.handleChange}/>
            <InputField label="Address" name="address" formErrors={formErrors} onChangeFn={this.handleChange}/>
            <InputField label="Phone Number" name="phoneNumber" formErrors={formErrors} onChangeFn={this.handleChange}/>
          <hr/>
          <input className="btn btn-primary" type="submit" value="Submit" disabled= {validForm ? "": "disabled"}/>
        </form>
      );
    }
  }