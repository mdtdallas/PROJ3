import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AddPhotoAlternateIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert, IconButton, Snackbar, Button } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditCat({ title }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [file, setFile] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  const [breeder, setBreeder] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [severity, setSeverity] = useState('success')
  const {id} = useParams();

  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/cat/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then(res => res.json())
    .then((data) => {
      setName(data[0].name);
      setBreed(data[0].breed);
      setAge(data[0].age);
      setImage(data[0].image);
      setBreeder(data[0].breeder);
    })
  }, [])
 
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

  const submit = () => {
    const email = localStorage.getItem('email');
    const data = { name: name, breed: breed, age: age, image: image, breeder: breeder, email: email, id: id };
    console.log(data);
    fetch("https://proj2-api.herokuapp.com/api/catUpdate/update", {
      method: "PATCH",
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
        //if(data.status) window.location.href = '/cats';
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
                <label htmlFor="name">Name</label>
                <input
                defaultValue={name}
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="image">Image Link</label>
                <input
                defaultValue={image}
                  type="text"
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="breed">Breed</label>
                <input
                defaultValue={breed}
                  type="text"
                  name="breed"
                  onChange={(e) => setBreed(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="age">Age</label>
                <input
                defaultValue={age}
                  type="text"
                  name="age"
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="formInputs">
                <label htmlFor="breeder">Breeder</label>
                <input
                defaultValue={breeder}
                  type="text"
                  name="breeder"
                  onChange={(e) => setBreeder(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className='newButton'>
                Update Cat
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
