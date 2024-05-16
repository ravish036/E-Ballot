import React, {useState, useEffect} from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import {registerCandidates, whiteListAddress, getAllCandidate, getWinner, startVoting, stopVoting} from '../web3_functions'
import QRCode from 'qrcode';
import './admin.css'
// const errorMsg = (
//     <Alert severity="error">
//         <AlertTitle>Error</AlertTitle>
//         This is an error alert — <strong>check it out!</strong>
//     </Alert>
// )


function AdminComponent({account, contractInstance}) {

    const title = useLocation();
    console.log(title.state.title);

    const [candidateName, setCandidateName] = useState();
    const [candidateAge, setCandidateAge] = useState();
    const [candidateAddress, setCandidatAddress] = useState();
    const [voterAddress, setVoterAddress] = useState();
    const [winnerAddress, setWinnerAddress] = useState("");
    const [imgURL, setImgURL] = useState("");
    const navigate = useNavigate();


    async function register_candidate(){
        console.log("name:", candidateName);
        let result = await registerCandidates(contractInstance, account, candidateName, candidateAge, candidateAddress);
        console.log("result:", result);
    }

    
    async function register_voter(){
        console.log("name:", candidateName);
        let result = await whiteListAddress(contractInstance, account, voterAddress);
        console.log("result:", result);
        generateQR();
    }

    
    async function start_voting(){
        console.log("name:", candidateName);
        let result = await startVoting(contractInstance, account);
        console.log("result:", result);
    }

    
    async function stop_voting(){
        console.log("name:", candidateName);
        let result = await stopVoting(contractInstance, account);
        console.log("result:", result);
    }

    
    async function get_Winner(){
        console.log("name:", candidateName);
        let {message} = await getWinner(contractInstance, account);
        console.log("result:", message);
        setWinnerAddress(message.name);
        navigate("/Winner", {state:{winner : message.name}});
    }


    // qr-code

    async function generateQR(){
        try {
            const response = await QRCode.toDataURL(voterAddress);
            setImgURL(response);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div style={{paddingTop: "18px", paddingLeft: "5%", paddingRight: "5%" , backgroundColor: "#cbcdce", height:"97vh" , textAlign:"center"}}>
            <div className='banner-area'style={{marginBottom: 20}} >
                <h1>WELCOME TO {title.state.title} ELECTION</h1>
            </div>
            <div style={{display:"flex", justifyContent:"center", marginTop:"5rem"}} >
                <div style={{float:"left", marginRight: 100}}>
                    <Card sx={{ width: 400 }}>
                        <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2} style={{marginTop: '10px'}}>
                            Register Candidate
                        </Typography>
                        <CardContent>
                            <TextField id="outlined-basic" label="Name" variant="outlined" style={{width: '100%', marginBottom: '10px'}}
                                onChange={(e)=>setCandidateName(e.target.value)}/>
                            <TextField id="outlined-basic" label="Age" variant="outlined" style={{width: '100%',marginBottom: '10px'}}
                                onChange={(e)=>setCandidateAge(e.target.value)}/>
                            <TextField id="outlined-basic" label="Wallet Address" variant="outlined" style={{width: '100%'}}
                                onChange={(e)=>setCandidatAddress(e.target.value)}/>
                        </CardContent>
                        <CardActions sx={{display:"flex" , justifyContent:"center", marginBottom:2}}>
                            <Button variant="outlined" className='candidate' onClick={register_candidate}>Register Candidate</Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ width: 400, marginTop: 5, display:"flex", flexWrap:"wrap"}}>
                       
                        <CardActions align="middle" className='votingCard'>
                            <Button variant="outlined" className='VotingToggle' onClick={start_voting}>Start Voting</Button>
                        </CardActions>
                        <CardActions className='votingCard'>
                            <Button className='VotingToggle' variant="outlined" onClick={stop_voting}>Stop Voting</Button>
                        </CardActions>

                        <CardActions className='getwinner'>
                            <Button sx={{display:"flex", justifyContent:"center" , width:"98%"}} variant='outlined' onClick={get_Winner}>Get Winner</Button>
                        </CardActions>
                    </Card>                    
                </div>
                <div>
                    <Card sx={{ maxWidth: 400,  marginBottom: 5}}>
                        <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2} style={{marginTop: '10px'}}>
                            Register Voter
                        </Typography>
                        <CardContent>
                            <TextField id="outlined-basic" label="Wallet Address" variant="outlined" style={{width: '100%'}}
                                onChange={(e)=>setVoterAddress(e.target.value)}/>
                        </CardContent>
                        <CardActions sx={{display:"flex", justifyContent:"center"}}>
                            <Button sx={{width:"96%"}} variant="outlined" onClick={ register_voter}>Register Voter</Button>
                        </CardActions>
                        
                        <CardActions sx={{display:"flex", justifyContent:"center"}}>

                        {/* <TextField id="outlined-basic" label="text" variant="outlined" style={{width: '100%', marginBottom: '10px'}}
                                onChange={(e)=>setText(e.target.value)}/> 
                        <Button onClick={() => generateQR()} >Generate</Button> */}
                        
                        <br/>
                        {imgURL? 
                            (<a href={imgURL} download >
                                <img src={imgURL} alt='img' />
                            </a> ) : null
                        }
                        </CardActions>
                    </Card>
                </div>
                
            </div>
      </div>
    )
}

export default AdminComponent;