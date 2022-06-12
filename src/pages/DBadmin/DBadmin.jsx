import React, { useState } from "react";
import "../../App.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import DBdataTable from "./DBdataTable";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DBadmin() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);

  const clearLog = () => {
    fetch('https://proj2-api.herokuapp.com/logs/clear', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then(res => res.json())
    .then((data) => {
      if(!data.error) setStatus(data.status);
      if(data.error) setError(data.error);
      if(data.error) setSeverity('error');
      handleClick();
    })
  }

  const refresh = () => {
    window.location.reload();
    return;
  }
 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="dbadmin">
      <Sidebar />
      <div className="dbadminContainer">
        <Navbar />
        <div className="top">
          <div className="controlButtons">
          <h1>Table Management</h1>
            <div className="buttonStack">
            <Button variant="contained" color="success" onClick={clearLog}>Clear Log Files</Button>
            <Button variant="contained" onClick={refresh}>Refresh Page</Button>
            <Button type="submit" variant="contained" color="error">
              Clear Cats Table
            </Button>
            <Button type="submit" variant="contained" color="error">
              Clear Entrants Table
            </Button>
            <Button type="submit" variant="contained" color="error">
              Clear Users Table
            </Button>
            <Button type="submit" variant="contained" color="error">
              Clear Shows Table
            </Button>
            </div>
          </div>
        </div>
        <div className="dbottom">
          <DBdataTable />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[status, error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
