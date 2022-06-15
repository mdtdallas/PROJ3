import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AddPhotoAlternateIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert, IconButton, Snackbar, Button } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

export default function EditUser({ title }) {
  const [file, setFile] = useState("");
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("success");
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setPassword(data[0].password);
        setPhone(data[0].phone);
        setImage(data[0].image);
        setEmail(data[0].email);
        setRole(data[0].userType);
      });
  }, []);

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
    const data = {
      email: email,
      password: password,
      name: name,
      phone: phone,
      image: image,
      userType: role,
      id: id,
    };
    fetch("https://proj2-api.herokuapp.com/api/userUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) setError(data.error);
        if (data.warning) setWarning(data.warning);
        if (data.warning) setSeverity("warning");
        if (data.error) setSeverity("error");
        if (data.status) setSuccess(data.status);
        handleClick();
        if (data.status) {
          window.location.href = '/users'
          action();
        }
      });
  };

  return (
    <div className="edit">
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
            <form onSubmit={submit} autocomplete="off">
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
                  defaultValue={email}
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="password">Password</label>
                <input
                  defaultValue={password}
                  autocomplete="new-password"
                  type="text"
                  minLength='4'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="name">Name</label>
                <input
                  defaultValue={name}
                  pattern='[A-Za-z]{3}'
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="phone">Phone</label>
                <input
                  defaultValue={phone}
                  type="text"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  pattern='[0-9]{10,10}'
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="image">Image Link</label>
                <input
                  defaultValue={image}
                  type="url"
                  name="phone"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="userType">Role</label>
                <select
                  name="userType"
                  id="userTyle"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <br />
              <button type="submit" className="newButton">
                Update User
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
