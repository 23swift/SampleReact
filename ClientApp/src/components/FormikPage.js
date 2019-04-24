import React from 'react';
import { Form,Field,withFormik    } from 'formik';
import $ from 'jquery';
import * as Yup from 'yup';

const isValidForm=(obj)=>{
    return $.isEmptyObject(obj);

}
const FormikPageTemplate =({values, touched, errors,isSubmitting }) =>
  (<Form>
      <h1>Sign in</h1>
     
     <div className="form-group">
     
     <label className={errors.name && touched.name?"text-danger":""} >Name</label>
        <Field type="text"  className={errors.name && touched.name?"form-control  is-invalid":"form-control"} name="name"   />
        {errors.name && touched.name && <span className="invalid-feedback">{errors.name}</span>  }
     </div>
     <div className="form-group">
     <label className={errors.email && touched.email?"text-danger":""} >Email</label>
          <Field type="email" className={errors.email && touched.email?"form-control  is-invalid":"form-control"}  name="email" />
          {errors.email && touched.email && <span className="invalid-feedback">{errors.email}</span>  }
     </div>
     <div className="form-group">
     <label className={errors.password && touched.password?"text-danger":""}>Password</label>
          <Field type="password" className={errors.password && touched.password?"form-control  is-invalid":"form-control"}  name="password"  />
          {errors.password && touched.password && <span className="invalid-feedback">{errors.password}</span>  }
     </div>
      <button type="submit" className="btn btn-primary" disabled={isValidForm(errors) && !isSubmitting ? "":"disabled"}>
        
        {isSubmitting ? <span><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Please wait...</span>: "Submit"}
      </button>
     
   </Form>);

  const SignupSchema=Yup.object().shape({
    name:Yup.string()
    .min(2,"Minimum of two Characters")
    .max(20,"Maximum of 20 Characters")
    .required('Name is Required'),
    email:Yup.string()
    .email('Invalid email')
    .required('Email is Required'),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { excludeEmptyString: true,message:"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" })
    .required('Password is Required')
    .min(8,"Minimum of 8 Characters")
    
  
  });

export const FormikPage = withFormik({
  mapPropsToValues({ name,email,password}) {

    return{
        name:name || "",
        email:email ||"",
        password:password ||""
    }
  },
  // Custom sync validation
  validationSchema:SignupSchema
  ,

  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(values.password, null, 2));
      setSubmitting(false);
    }, 3000);
  },

  displayName: 'BasicForm',
})(FormikPageTemplate);


export default FormikPage