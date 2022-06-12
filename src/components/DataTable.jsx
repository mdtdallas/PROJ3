import React, { useState } from "react";
import "../App.css";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
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
      width: 90,
    },
    {
      field: "showsEntered",
      headerName: "Shows Entered",
      type: "number",
      width: 110,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: () => {
        return (
          <div className="cellWithImg">
            <Avatar
              className="cellImg"
              src="https://picsum.photos/200"
              alt="avatar"
            />
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230 },
  ];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    email: "john@mail.com",
    totalCats: 10,
    showsEntered: 20,
    phone: 478799463,
  },
  { id: 2, lastName: "Dallas", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable(params) {
  const [data, setData] = useState(null)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <a href="/users/test">
              <div className="viewButton">View</div>
            </a>
            <a href="/users/test">
              <div className="deleteButton" onClick={()=> handleDelete(params.rows.id)}>Delete</div>
            </a>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }} className="datatable">
      <div className="datatableTitle">
        Add New User
        <a href="/users/new">New User</a>
      </div>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
}
