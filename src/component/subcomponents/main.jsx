import React, { useState } from "react";
import Box from "@mui/material/Box";
import Nav from "./nav";
import Typography from "@mui/material/Typography";
import img1 from "../../images/home.png";
import "./main.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from 'react-router-dom';
import { Input } from "@mui/material";


const Main = () => {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [open, setOpen] = React.useState(false);

  // function goTo(){
  //   navigate("/admin", {state : {Title: word}})
  // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="main">
      <Box>
        <Nav />
      </Box>
      <Box
        className="content"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box className="">
          <img id="img1" src={img1} alt="" />
        </Box>
        <Box sx={{ marginTop: "8rem", width: "45%" }}>
          <Typography variant="h2" sx={{ fontWeight: "900", color: "#033c58" }}>
            Easy online Voting
          </Typography>
          <Typography variant="h4" sx={{ marginBottom: "8px" }}>
            Create your vote in secured way <br /> and save your time.
          </Typography>

          {/* Enter Title  Button*/}

          <button className="cssbuttons-io-button" onClick={handleClickOpen}>
            {" "}
            Get started
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </div>
          </button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Title</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please specify whether you are referring to a specific type of
                election or voting procedure.
              </DialogContentText>
              <Input
                autoFocus
                margin="dense"
                id="name"
                label="Title of Voting"
                type="text"
                fullWidth
                variant="standard"
                placeholder="enter title here.."
                onChange={(e) => {
                  setWord(e.target.value);
                  
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => navigate("/admin" ,{state : {title : word}})}>Submit</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
        <Box className="footer"></Box>

    </Box>
  );
};

export default Main;
