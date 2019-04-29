import React, { Component } from 'react'
import Posts from './Posts'
import store from '../store/'
import {Provider} from 'react-redux'
export class PostsContainer extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>
                <Posts/>
            </div>
      </Provider>
    )
  }
}

export default PostsContainer
