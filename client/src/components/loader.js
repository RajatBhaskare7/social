import React, { Component } from "react";
import '../scenes/Home/style.css';
export default class loader extends Component {
    //write styles in this way
    styles = {
        width:'100%',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#241F3A'
    }
    UNITE={
        color:'#fff',
        fontSize:'2rem',
        fontWeight:'bold',
        letterSpacing:'0.2rem',
        marginLeft:'1rem',
        marginTop:'1rem',
        //uppercase
        textTransform:'uppercase'
    }
    
  

  render() {
    return (
      <div className="loading_landing" style={this.styles}>
        <img src="../assets/logoo.png" className="main__loader" alt="loader"  />
        {/* <h1 style={this.UNITE}>UNITE the world together</h1> */}
      </div>
    );
  }
}
