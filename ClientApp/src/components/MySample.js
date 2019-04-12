import React, { Component } from 'react'

export  class MySample extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
     this.handleClick = this.handleClick.bind(this);
    
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  activateLasers(){

     console.log("test button click");
    // alert('test');
  }
  render() {
    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <h2>{this.props.address}</h2>
        <h2>{this.props.phone}</h2>
        <button className="btn btn-primary" onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    )
  }
}

export default MySample
