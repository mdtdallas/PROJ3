import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Alert, Button, CircularProgress, IconButton, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import UserSingle from "./UserSingle";
import CloseIcon from "@mui/icons-material/Close";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "First name", width: 130 },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 170,
  },
  {
    field: "totalCats",
    headerName: "Total Cats",
    type: "number",
    width: 130,
  },
  {
    field: "showsEntered",
    headerName: "Shows Entered",
    type: "number",
    width: 130,
  },
  {
    field: "image",
    headerName: "Image",
    width: 90,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <Avatar
            className="cellImg"
            src={params.row.image}
            alt="avatar"
            width='100%'
          />
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 230 },
  { field: "userType", headerName: "User Type", width: 130 },
];

export default function UsersDataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState();
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  async function handleDelete(id) {
    const res = await fetch(`https://proj2-api.herokuapp.com/api/userDelete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    const data = await res.json();
    if (data.status) setStatus(data.status);
    if (data.warning) setSeverity("warning");
    if (data.warning) setWarning(data.warning);
    if (data.error) setError(data.error);
    if (data.error) setSeverity("error");
    handleClick();
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://proj2-api.herokuapp.com/api/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data.results);
        setStatus(data.status);
        handleClick();
      })
      .catch((err) => {
        setError(err);
        setRows(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <>
              <Link to={`/users/edit/${params.row.id}`}>
                <div className="newButton">Edit</div>
              </Link>
            </>
            <>
              <Link to={`/users/${params.row.id}`} element={<UserSingle />}>
                <div className="viewButton">View</div>
              </Link>
            </>
            <>
              <div
                className="deleteButton"
                onClick={() => {
                  handleDelete(params.row.id);
                }}
              >
                Delete
              </div>
            </>
          </div>
        );
      },
    },
  ];

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    action();
    if (status) window.location.reload();
  };

  

  return (
    <div style={{ height: 700, width: "100%" }} className="datatable">
      <div className="datatableTitle">
        Add New User
        <a href="/users/new">New User</a>
      </div>
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
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[status, warning, error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
