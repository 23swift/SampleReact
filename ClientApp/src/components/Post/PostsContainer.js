import React, { Component } from 'react'
import Posts from './Posts'
import store from '../../store'
import {Provider} from 'react-redux'
import PostForm from '../PostForm'
import PostFormPage from './PostFormPage'
import red from '@material-ui/core/colors/red';
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
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

  testFunction=()=>{

    console.log('Test function')
  }
  render() {
    return (
      <MuiThemeProvider  theme={theme}>
            <Provider store={store}>

            <div className="row">
              <div className="col-md-4 pr-md-1"><PostFormPage   /></div>
              <div className="col-md-8 pl-md-1"> <Posts/></div>
            </div>
                   
              </Provider>
      </MuiThemeProvider>
        
    )
  }
}

export default PostsContainer
