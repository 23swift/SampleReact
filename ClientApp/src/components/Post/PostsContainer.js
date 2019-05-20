import React, { Component } from 'react'
import Posts from './Posts'
import store from '../../store'
import {Provider} from 'react-redux'
import {  Alert } from 'reactstrap';
import PostFormPage from './PostFormPage'
import red from '@material-ui/core/colors/red';
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';

import {CSSTransition}  from 'react-transition-group'; // ES6
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {main:'#1e4f8e'},
    secondary:{main:'#f7af19'},
    error:red,
  },
});
export class PostsContainer extends Component {
  constructor(props){
    super(props)
      this.state={
        showButton:true, 
        setShowButton:true,
        showMessage:false, setShowMessage:false

      }

  }

  testFunction=()=>{

    console.log('Test function')
  }
  
  //  [showButton, setShowButton] = useState(true);
    // const [showMessage, setShowMessage] = useState(false);
  render() {
    
    return (
      <MuiThemeProvider  theme={theme}>
            <Provider store={store}>

            <div className="row">
              <div className="col-md-4 pr-md-1"><PostFormPage   />
             
              </div>
              <div className="col-md-8 pl-md-1">

               <Posts/>
              
               </div>
            </div>
                   
              </Provider>
      </MuiThemeProvider>
        
    )
  }
}

export default PostsContainer
