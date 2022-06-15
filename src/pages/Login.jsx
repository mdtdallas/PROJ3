import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login3() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState('');
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  let validationParams = Yup.object().shape({
    email: Yup.string().required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(2, "Must be more than 2 characters"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationParams,
    onSubmit: (values) => {
      
    fetch("https://proj2-api.herokuapp.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) setStatus(data.status);
        if (data.warning) setWarning(data.warning);
        if (data.warning) setSeverity('warning');
        if (data.error) setError(data.error);
        if (data.error) setSeverity("error");
        localStorage.clear();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("email", data.email);
        localStorage.setItem('userID', data.userID);
        localStorage.setItem('username', data.username);
        if (data.status) setWarning('');
        if (data.status) setSeverity('success')
        handleClick();
        if(data.status) {
          setWarning('');
          setError('');
          navigate("/");
        window.location.reload();
        }
      });
    }
  });

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
    <div className="login">
      <h1>Admin Login</h1>
      <div className="loginContainer">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          required
        />
        {formik.errors.email && formik.touched.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          required
        />
        {formik.errors.password && formik.touched.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        <button type="submit" className="btn btn-light" onClick={formik.handleSubmit}>
          Submit
        </button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[status, warning, error]}
        </Alert>
      </Snackbar>
      
    </div>
  );
}
