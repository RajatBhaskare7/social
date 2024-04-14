import React, { Component } from 'react'
import { Grid, Paper } from '@mui/material';
import './style.css';
import { Link } from 'react-router-dom';

export default class index extends Component {
  constructor(props) {
    super(props);

  }
  loginpage = () => {
    this.props.history.push('/auth');
  }
  

  render() {
    return (
      <div>
      <div class="background">
	{/* <!-- For full page background --> */}
	<div class="container">
		<img src="../assets/logoo.png" alt="Huddle" style={{width:'7rem'}} className="logo"/>

		<div class="hero">
			<div class="hero-img">
				<img src="../assets/homelanding.png" alt="illustration-mockups" class="mockup"/>
			</div>

			<div class="hero-text">
				<h1 class="head">UNITE: Connect and Empower Together</h1>

				<p class="text">Join UNITE, the social media platform for positive change. Connect and empower with a supportive community of like-minded individuals, and make a difference together.</p>

				<button class="btn text" style={{
          color:'#241F3A',
        }}>

          <Link to="/auth" className="btn-reg" style={{textDecoration:'none'}}>Register</Link>
        </button>

			</div>
		</div>

		<div class="socials">
			{/* <!-- Social Links --> */}
			<button class="social-btn facebook"></button>
			<button class="social-btn twitter"></button>
			<button class="social-btn instagram"></button>
		</div>
	</div>
</div>
    </div>
    )
  }
}
