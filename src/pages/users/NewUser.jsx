import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AddPhotoAlternateIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert, IconButton, Snackbar, Button } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

export default function NewUser({ title }) {
  const [file, setFile] = useState("");
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    window.location.reload();
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
    const data = {
      email: email,
      password: password,
      name: name,
      phone: phone,
      image: image,
      userType: role,
    };
    fetch("https://proj2-api.herokuapp.com/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) setStatus(data.status);
        if (data.warning) setWarning(data.warning);
        if (data.warning) setSeverity('warning');
        if (data.error) setError(data.message);
        if (data.error) setSeverity("error");
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
                file ? URL.createObjectURL(file) : 'https://api.lorem.space/image/face?w=150&h=150'
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="name">Phone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  minLength='10'
                  maxLength='10'
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
                <label htmlFor="userType">Role</label>
                <select
                  name="userType"
                  id="userType"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="newButton">
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[status, warning, error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
