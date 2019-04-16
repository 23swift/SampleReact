import React, {Component}from 'react';

import FormikPage from './FormikPage';
// export default class NewPage extends Component{
    export  class NewPage extends Component{
    constructor(props){
        super(props);


        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            list: Array(9),
            firstName:"",
            lastName:""
          };
    }

    handleChange = event => {
        event.preventDefault();
          const {name,value} = event.target;
          
          this.setState({[name]:value});
        }
    handleSubmit=(e)=>{
        e.preventDefault();
        let l=this.state.list;
        this.setState({list:l.concat(this.state.firstName + " "+ this.state.lastName)});
        console.log("Form submitted");
        e.target.reset();

    }
    render(){
        return(

            
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" name="firstName" onChange={this.handleChange}/>
                    
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" name="lastName" onChange={this.handleChange}/>
                    
                </div>
                <input type="submit" value="Submit" className="btn btn-primary" />


                <div>
                     <ul>
                         {
                             this.state .list.map((item)=>
                             <li>{item}</li>
                             )
                         }
                            
                    </ul>
                </div>
                <FormikPage/>
            </form>
           
           
        );
        
    }
}
export default NewPage