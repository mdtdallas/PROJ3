import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AddPhotoAlternateIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert, IconButton, Snackbar, Button } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

export default function EditShow({ title }) {
  const [file, setFile] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [judges, setJudges] = useState("");
  const [date, setDate] = useState("");
  const [council, setCouncil] = useState("");
  const [ticket_price, setTicket_price] = useState("");
  const [ticket_count, setTicket_count] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/showsShowID/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setShowTitle(data[0].title);
        setLocation(data[0].location);
        setImage(data[0].image);
        setJudges(data[0].judges);
        setDate(data[0].date);
        setCouncil(data[0].council);
        setTicket_price(data[0].ticket_price);
        setTicket_count(data[0].ticket_count);
      });
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if(success) window.location.href = '/shows';
    setOpen(false);
    action();
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
    const email = localStorage.getItem("email");
    const data = {
      title: showTitle,
      location: location,
      image: image,
      judges: judges,
      date: date,
      council: council,
      ticket_price: ticket_price.toString(),
      ticket_count: ticket_count.toString(),
      email: email,
      id: id
    };
    fetch("https://proj2-api.herokuapp.com/api/show/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) setError(data.error);
        if (data.warning) setWarning(data.warning);
        if (data.warning) setSeverity("warning");
        if (data.error) setSeverity("error");
        if (data.status) setSuccess(data.status);
        if (data.status) setSeverity('success');
        handleClick();
      });
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
                file ? URL.createObjectURL(file) : image
              }
              alt=""
            />
          </div>
          <div className="right">
            <form method="PATCH" autocomplete="off">
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
                defaultValue={showTitle}
                  type="text"
                  name="title"
                  pattern='[A-Za-z]{3,}'
                  onChange={(e) => setShowTitle(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="image">Image Link</label>
                <input
                defaultValue={image}
                pattern="https?://.+"
                  type="url"
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="location">Location</label>
                <input
                defaultValue={location}
                pattern='[A-Za-z0-9]{3,}'
                  type="text"
                  name="location"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="judges">Judges</label>
                <input
                defaultValue={judges}
                  type="text"
                  pattern='[A-Za-z]{3,}'
                  name="judges"
                  onChange={(e) => setJudges(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="date">Date</label>
                <input
                defaultValue={date}
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="council">Cat Council</label>
                <input
                defaultValue={council}
                  type="text"
                  pattern='[A-Za-z]{3}'
                  name="council"
                  onChange={(e) => setCouncil(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="ticket_price">Ticket Price</label>
                <input
                defaultValue={ticket_price}
                  type="text"
                  name="ticket_price"
                  pattern='[0-9]{1,4}'
                  onChange={(e) => setTicket_price(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="ticket_count">Amount of Tickets</label>
                <input
                defaultValue={ticket_count}
                  type="text"
                  name="ticket_count"
                  pattern='[0-9]{1,5}'
                  onChange={(e) => setTicket_count(e.target.value)}
                  required
                />
              </div>
              <button type="submit" onClick={submit} className="newButton">
                Update Show
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[success, warning, error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
