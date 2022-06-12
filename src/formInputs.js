import React from 'react'

import { Avatar } from "@mui/material";

export const userInputs = [
  {
    id: 1,
    label: "Email",
    type: "email",
    placeholder: "sam@mail.com",
  },
  {
    id: 2,
    label: "Password",
    type: "text",
    placeholder: "Password",
  },
  {
    id: 3,
    label: "Name",
    type: "text",
    placeholder: "Sam",
  },
  {
    id: 4,
    label: "Phone",
    type: "text",
    placeholder: "0411 222 333",
  },
  {
    id: 5,
    label: "User Type",
    type: "select",
    placeholder: "admin or user",
  },
];

export const showInputs = [
  {
    id: 1,
    label: "Title",
    type: "text",
    placeholder: "Show Title",
  },
  {
    id: 2,
    label: "Location",
    type: "text",
    placeholder: "Location",
  },
  {
    id: 3,
    label: "Judges",
    type: "text",
    placeholder: "Judges",
  },
  {
    id: 4,
    label: "Date",
    type: "date",
  },
  {
    id: 5,
    label: "Council",
    type: "text",
    placeholder: "Cat Council",
  },
  {
    id: 6,
    label: "Ticket Price",
    type: "text",
    placeholder: "$",
  },
  {
    id: 7,
    label: "Ticket Amount",
    type: "text",
    placeholder: "500",
  },
];

export const catInputs = [
  {
    id: 1,
    label: "Name",
    type: "text",
    placeholder: "Kitty",
  },
  {
    id: 2,
    label: "Breed",
    type: "text",
    placeholder: "...",
  },
  {
    id: 3,
    label: "Age",
    type: "text",
    placeholder: "2",
  },
  {
    id: 4,
    label: "Breeder",
    type: "text",
  },
];

export const photoInputs = [
  {
    id: 1,
    
    type: "file",
    
  },
];

export const userColumns = [
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