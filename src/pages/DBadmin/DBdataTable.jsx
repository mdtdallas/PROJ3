import { Button, CircularProgress, Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import "../../App.css";

const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "Req_Count", headerName: "Request Count", width: 200 },
  {
    field: "IP",
    headerName: "IP",
    width: 400,
  },
  {
    field: "email",
    headerName: "User",
    width: 180,
  },
  {
    field: "userType",
    headerName: "Access",
    width: 180,
  },
];

export default function DBdataTable() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  useEffect(() => {
    setLoading(true);
    fetch("https://proj2-api.herokuapp.com/logs", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
      })
      .catch((err) => {
        setRows(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addAllow = (id, ip, email) => {
    const AllowIP = { id: id, ip: ip, email: email, access: "allow" };
    fetch("https://proj2-api.herokuapp.com/allowIP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(AllowIP),
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setStatus(data.status);
        if (data.error) setError(data.error);
        if (data.error) setSeverity("error");
        handleClick();
      });
  };

  const addBlock = (id) => {
    const BlockIP = { id: id, access: "deny", email: "test@mail.com" };
    fetch("https://proj2-api.herokuapp.com/denyIP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(BlockIP),
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setStatus(data.status);
        if (data.error) setError(data.error);
        if (!data.error) setSeverity("error");
        handleClick();
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

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
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const actionColumn = [
    {
      field: "actionButton",
      headerName: "Allow / Block",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              variant="contained"
              className="sideButton"
              onClick={() => addAllow(params.row.id)}
            >
              Allow
            </Button>
            <Button
              variant="contained"
              className="sideButton"
              color="error"
              onClick={() => addBlock(params.row.id)}
            >
              Block
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 450, width: "100%" }} className="datatable">
      <div className="spinner">
        {loading && (
          <div>
            <CircularProgress
              color="success"
              className="iconSpinner"
              size={400}
            />
          </div>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
      </div>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={25}
        rowsPerPageOptions={[25]}
        checkboxSelection
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[status, error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
