import React, { useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FestivalIcon from "@mui/icons-material/Festival";
import PetsIcon from "@mui/icons-material/Pets";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import StorageIcon from "@mui/icons-material/Storage";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { DarkModeContext } from "./darkModeContext";
import { Alert, AlertTitle, IconButton, Button, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar() {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const logout = () => {
    fetch("https://proj2-api.herokuapp.com/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        localStorage.clear();
        handleClick();
        window.location.reload();
      });
  };

  const { dispatch } = useContext(DarkModeContext);
  const id = localStorage.getItem('userID')

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
    <>
    <div className="sidebar">
      <div className="sideTop">
        <a href="/">
          <span className="logo">Show Admin</span>
        </a>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="sideTitle">MAIN</p>
          <li>
            <a href="/">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </a>
          </li>
          <p className="sideTitle">CONTENT</p>
          <li>
            <a href="/users">
              <GroupIcon className="icon" />
              <span>Users</span>
            </a>
          </li>
          <li>
            <a href="/shows">
              <FestivalIcon className="icon" />
              <span>Shows</span>
            </a>
          </li>
          <li>
            <a href="/cats">
              <PetsIcon className="icon" />
              <span>Cats</span>
            </a>
          </li>
          <li>
            <a href="/photos">
              <InsertPhotoIcon className="icon" />
              <span>Photos</span>
            </a>
          </li>
          <p className="sideTitle">SETTINGS</p>
          <li>
            <a href="/dbadmin">
              <StorageIcon className="icon" />
              <span>Database Mangement</span>
            </a>
          </li>
          <p className="sideTitle">USER</p>
          <li>
            <a href={`/users/${id}`}>
              <AccountBoxIcon className="icon" />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <div onClick={logout} className='nav-link'>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
      <p className="bottomTitle">Theme Colours</p>
      <div className="sideBottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong>{status}</strong>
        </Alert>
      </Snackbar>
    </div>
    </>
  );
}
