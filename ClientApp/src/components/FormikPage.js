import React from 'react';
import { Formik,Field,ErrorMessage   } from 'formik';
import * as Yup from 'yup';
export  const FormikPage = () => (
  <div>
    <h1>Employee</h1>
    <Formik
      initialValues={{ firstName: '',lastName:'' }}
     
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      >

      {({ errors, touched, isValidating,isSubmitting,dirty}) => (
        <form >
        <div   className= "form-group" >
           <label className={errors.firstName && touched.firstName ?"text-danger" :""}>First Name</label>
            <Field className={errors.firstName && touched.firstName ?"form-control is-invalid" :"form-control"} type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" render={msg => <span className="invalid-feedback">{msg}</span>} />
        </div>
        <div className="form-group">
        <label className={errors.lastName && touched.lastName ?"text-danger" :""}>Last Name</label>
        <Field className={errors.lastName && touched.lastName ?"form-control is-invalid" :"form-control"} type="text" name="lastName" placeholder="last Name" />
        <ErrorMessage name="lastName" render={msg => <span className="invalid-feedback">{msg}</span>} />
        </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
        </form>
      )}
    </Formik>
  </div>
);
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required')
   
  });
export default FormikPage