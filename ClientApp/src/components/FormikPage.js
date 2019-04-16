import React from 'react';
import { Formik,Field  } from 'formik';

export  const FormikPage = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ firstName: 'arnold',lastName:'Costamero' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      
      render={props => (
        <form onSubmit={props.handleSubmit}>
        <div className="form-group">
           
            <Field className="form-control" type="text" name="firstName" placeholder="First Name" />
        </div>
        <div className="form-group">
        <Field className="form-control" type="text" name="lastName" placeholder="last Name" />
        </div>

          
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    />
  </div>
);

export default FormikPage