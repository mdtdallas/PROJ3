import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AddPhotoAlternateIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert, IconButton, Snackbar, Button } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

export default function NewShow({ title }) {
  const [showTitle, setShowTitle] = useState("");
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [judges, setJudges] = useState('');
  const [date, setDate] = useState('');
  const [council, setCouncil] = useState('');
  const [ticket_price, setTicket_price] = useState('');
  const [ticket_count, setTicket_count] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [severity, setSeverity] = useState('success')
 
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
        <GridCloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const submit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    const data = { title: showTitle, location: location, photo: image, judges: judges, date: date, council: council, ticket_price: ticket_price, ticket_count: ticket_count, email: email  };
    fetch("https://proj2-api.herokuapp.com/api/shows/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
      .then((data) => {
        if(data.status) setStatus(data.status);
        if(data.warning) setWarning(data.warning)
        if(data.error) setError(data.message);
        if(data.warning) setSeverity('warning');
        if(data.error) setSeverity('error');
        handleClick();
        //window.location.reload();
      })
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file ? URL.createObjectURL(file) : 'https://api.lorem.space/image/movie?w=150&h=220'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={submit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <AddPhotoAlternateIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInputs">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={(e) => setShowTitle(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="image">Image Link</label>
                <input
                  type="text"
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="judges">Judges</label>
                <input
                  type="text"
                  name="judges"
                  onChange={(e) => setJudges(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="council">Cat Council</label>
                <input
                  type="text"
                  name="council"
                  onChange={(e) => setCouncil(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="ticket_price">Ticket Price</label>
                <input
                  type="text"
                  name="ticket_price"
                  onChange={(e) => setTicket_price(e.target.value)}
                  min='1'
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="ticket_count">Amount of Tickets</label>
                <input
                  type="text"
                  name="ticket_count"
                  onChange={(e) => setTicket_count(e.target.value)}
                  min='1'
                  required
                />
              </div>
              <button type="submit" className='newButton'>
                Create Show
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
         {[status, warning,  error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
