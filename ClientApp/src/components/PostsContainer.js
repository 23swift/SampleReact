import React, { Component } from 'react'
import Posts from './Posts'
import store from '../store/'
import {Provider} from 'react-redux'
// import PostForm from './PostForm'
import {PostFormPage} from './PostFormPage'
export class PostsContainer extends Component {
  render() {
    return (
        <Provider store={store}>
         <PostFormPage/>
         
         
            <div>
                <Posts/>
            </div>
      </Provider>
    )
  }
}

export default PostsContainer
