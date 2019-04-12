import { useState  } from 'react'
export const ValidateEmployeeForm = (name,value,formErrors) => {
    // const [formErrors, setformErrors] = useState(formErrors);
    switch (name) {
      case "firstName":
      formErrors.firstName= value.length <3 ? "Minimun of 3 characters required":""
        
        break;
        case "lastName":
        formErrors.lastName= value.length >10 ? "Maximum of 10 characters required":""
          
          break;
          case "phoneNumber":
          formErrors.phoneNumber= value.length >10 ? " Maximum of 10 characters required":""
            
            break;
      default:
        break;
    }
    // setformErrors(formErrors);
}

export const isFormValid = formErrors => {
  let valid=true;

  Object.values(formErrors).forEach(val=>{

    val.length>0 && (valid=false);

  });
  return valid;
}


