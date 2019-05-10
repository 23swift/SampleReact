import React, { Component } from 'react'
import Posts from './Posts'
import store from '../store/'
import {Provider} from 'react-redux'
import PostForm from './PostForm'
import PostFormPage from './PostFormPage'

import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {main:'#1e4f8e'},
    secondary:{main:'#f7af19'}
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
                <PostFormPage   />
                {/* <PostForm/> */}
                
                    <div>
                        <Posts/>
                    </div>
              </Provider>
      </MuiThemeProvider>
        
    )
  }
}

export default PostsContainer
