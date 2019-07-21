import React, { Component } from "react";
import Switch from "react-switch";
import '../styles/DemoSwitch.css';

export default class DemoSwitch extends Component {
    constructor(props) {
      super(props);
      this.state = { checked: this.props.demoMode };
      this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(checked) {
      this.setState({ checked });
      this.props.toggleDemoMode();
    }
   
    render() {
      return (
        <div className="switch-container">
          <Switch 
            onChange={this.handleChange} 
            checked={this.state.checked}
            onColor="#64CDD6"
            width={80}
            checkedIcon={<div className="demo-button-on">DEMO</div>}
            uncheckedIcon= {<div></div>}
          />
        </div>
      );
    }
  }
