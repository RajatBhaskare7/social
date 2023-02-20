import React from 'react'
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import '../loginPage/form.css'
// import Logo from '../../../public/assets/logoo.png';
export default function Editprofile() {
    const user = useSelector(state => state.user);
    console.log(user);


    
  return (
    <div>
      <main>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form  class="sign-in-form">
            <div className="logo">
                <img src="../../assets/logoo.png" alt="error" />
             
              </div>

              <div class="heading">
                <h2>Edit Profile</h2>
               
              </div>

              <div class="actual-form margin-top">
                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Username'
                    required
                  />
                
                </div>

                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='First Name'
                    required
                  />
                 
                </div>

                <input type="submit" value="Sign In" class="sign-btn" />

               
              </div>
            </form>

            <form action="index.html" autocomplete="off" class="sign-up-form">
              <div class="logo">
                <img src="./assets/logoo.png" alt="easyclass" />
                <h4>easyclass</h4>
              </div>

              <div class="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" class="toggle">Sign in</a>
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    required
                  />
                  <label>Name</label>
                </div>

                <div class="input-wrap">
                  <input
                    type="email"
                    class="input-field"
                    autocomplete="off"
                    required
                  />
                  <label>Email</label>
                </div>

                <div class="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    required
                  />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign Up" class="sign-btn" />

                <p class="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

         
        </div>
      </div>
    </main>

       
        

       


        
    

    </div>
  )
}
