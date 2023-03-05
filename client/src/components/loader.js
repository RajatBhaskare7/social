import React, { Component } from "react";

export default class loader extends Component {
    //write styles in this way
    styles = {
        width:'100%',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#241F3A'
    }

  render() {
    return (
      <div className="loading_landing" style={this.styles}>
        <img src="../assets/logoo.png" alt="loader" style={{
            width:'20%'
        }} />
      </div>
    );
  }
}
