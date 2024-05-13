import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../images/icons32.png';
import './main.css'
// import { useWeb3Modal } from '@web3modal/ethers5/react'

export default function ButtonAppBar() {
    // const { open } = useWeb3Modal();

  return (
    <Box  sx={{ flexGrow: 1 }}>     
        <AppBar position="scroll" sx={{boxShadow:'none', background:'white'}} >
            <Toolbar className='navbar'>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1,
                 alignItems:'left',
                 marginLeft:'4rem',
                 fontFamily:'Croissant One',
                 fontSize:'2.2rem'
                }}>
                    <img src={logo} className='logo' alt="" />
                E-Ballot
            </Typography>
            <button> Connect Wallet
                <div className="arrow-wrapper">
                    <div className="arrow"></div>
                </div>
            </button>
            </Toolbar>
        </AppBar>
    </Box>
  );
}