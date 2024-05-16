import React from 'react';
import { useLocation } from 'react-router-dom';
import "./admin.css"
// import { Height } from '@mui/icons-material';

 function winner (){
    // const location = useLocation();
  return ( 
    <>
        <h1 style={{
            display:"flex",
            alignContent:"center",
            justifyContent:"center",
            Height:"100vh"
        }} >
        {/* {location.state.winner} */}
        </h1>
    </>
  )
}

export default winner;