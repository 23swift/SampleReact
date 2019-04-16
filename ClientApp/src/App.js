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
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/my-page' component={MySample} />
        <Route path='/nameForm' component={EmployeeForm} />
        <Route path='/newPage' component={FormikPage} />
        
      </Layout>
    );
  }
}
