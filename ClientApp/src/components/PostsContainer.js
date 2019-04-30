import React, { Component } from 'react'
import Posts from './Posts'
import store from '../store/'
import {Provider} from 'react-redux'
import PostForm from './PostForm'
export class PostsContainer extends Component {
  render() {
    return (
        <Provider store={store}>
         <PostForm/>
            <div>
                <Posts/>
            </div>
      </Provider>
    )
  }
}

export default PostsContainer
