import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './form.css'

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);



  

  
  
 


  


  return (
    <Box>
      {/* <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box> */}

      {/* <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box> */}
      <main>
      <div class="box">
        <div class="inner-box">
         <Form/>

          <div class="carousel">
            <div class="images-wrapper">
              <img src="../assets/loginlanding.png" class="image img-1 show" alt="" />
              
            </div>

            
          </div>
        </div>
      </div>
    </main>
    </Box>
    

    
  );
};

export default LoginPage;
