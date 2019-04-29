import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {MySample} from './components/MySample';
import {EmployeeForm} from './components/Employee/EmployeeForm';
import{NewPage} from './components/NewPage'
import {FormikPage} from './components/FormikPage'
import{PostsContainer} from './components/PostsContainer'

import {connect} from 'react-redux'
import updateUser from './components/reduxAppConfig/User/UserAction'
import store from './store';

class App extends Component {
  constructor(props){
    super(props)

    this.onUpdateUser=this.onUpdateUser.bind(this);
  }
  onUpdateUser(){
    
    this.props.onUserUpdate('Arnold Costamero');
  };
  static displayName = App.name;

  render () {
    // console.log(this.props);
    return (
      
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/my-page' component={MySample} />
        <Route path='/nameForm' component={EmployeeForm} />
        <Route path='/sign-in' component={FormikPage} />
        <Route path='/postsContainer' component={PostsContainer} />
        
      </Layout>
     
               
    );
  }
}

const mapStateToProps=state=>({

  posts:state.posts,
  user:state.user
});
const mapDispatchToProps={
   onUserUpdate:updateUser

}
// export default  connect(mapStateToProps,mapDispatchToProps)(App);
export default  App;