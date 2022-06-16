import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Cat from "./Cat";
import {
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "breed",
    headerName: "Breed",
    width: 170,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 70,
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
          />
        </div>
      );
    },
  },
  { field: "breeder", headerName: "Breeder", width: 130 },
  { field: "email", headerName: "User", width: 230 },
];

export default function CatDataTable() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [warning, setWarning] = useState();
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://proj2-api.herokuapp.com/api/cats", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((info) => {
        setRows(info);
      })
      .catch((err) => {
        setError(err);
        setRows(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleDelete(id) {
    const res = await fetch(
      `https://proj2-api.herokuapp.com/api/catDelete/delete/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        credentials: 'include'
      }
    );
    const data = await res.json();
    if (data.status) setStatus(data.status);
    if (data.warning) setSeverity("warning");
    if (data.warning) setWarning(data.warning);
    if (data.error) setError(data.error);
    if (data.error) setSeverity("error");
    handleClick();
    if (data.status) window.location.reload();
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <>
              <Link to={`/cats/edit/${params.row.id}`}>
                <div className="newButton">Edit</div>
              </Link>
            </>
            <Link to={`/cats/${params.row.id}`} element={<Cat />}>
              <div className="viewButton">View</div>
            </Link>
            <div className="link">
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
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
  };

  return (
    <div style={{ height: "80%", width: "100%" }} className="datatable">
      <div className="datatableTitle">
        Add New Cat
        <a href="/cats/new">Add Cat</a>
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
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {[status, warning, error]}
        </Alert>
      </Snackbar>
    </div>
  );
}
