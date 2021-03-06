import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "title", headerName: "Title", width: 180 },
  {
    field: "location",
    headerName: "Location",
    width: 180,
  },
  {
    field: "judges",
    headerName: "Judges",
    width: 90,
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
  { field: "date", headerName: "Date", width: 110 },
  { field: "council", headerName: "Cat Council", width: 190 },
  { field: "ticket_price", headerName: "Price", width: 70 },
  { field: "ticket_count", headerName: "Tickets", width: 70 },
  { field: "email", headerName: "Created By", width: 150 },
];

export default function ShowsDataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState();
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  async function handleDelete(id) {
    const res = await fetch(`https://proj2-api.herokuapp.com/api/show/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      credentials: 'include'
    });
    const data = await res.json();
    if (data.status) setStatus(data.status);
    if (data.warning) setSeverity("warning");
    if (data.warning) setWarning(data.warning);
    if (data.error) setError(data.error);
    if (data.error) setSeverity("error");
    handleClick();
    if (data.status) window.location.reload();
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://proj2-api.herokuapp.com/api/shows", {
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <>
              <Link to={`/shows/edit/${params.row.id}`}>
                <div className="newButton">Edit</div>
              </Link>
            </>
            <>
              <Link to={`/shows/${params.row.id}`}>
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
  };

  return (
    <div style={{ height: '80vh', width: "80vw" }} className="datatable">
      <div className="datatableTitle">
        Add New Show
        <a href="/shows/new">Add Show</a>
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
