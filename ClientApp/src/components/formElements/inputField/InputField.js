import React, { useState  } from 'react'



export const InputField = (props) => {
    return (
        <div className="form-group">
        <label className={ props.formErrors[props.name].length == 0 ? "":"text-danger"}>{props.label}</label>
        <input className={ props.formErrors[props.name].length == 0 ? "form-control":"form-control is-invalid"} type="text" name={props.name}  type="text"  noValidate 
        onChange={props.onChangeFn}  />
         {props.formErrors[props.name].length >0 && (
                  <span className="invalid-feedback">{props.label + " " + props.formErrors[props.name]}</span>
                )}
    </div>
    )
}

export default InputField;