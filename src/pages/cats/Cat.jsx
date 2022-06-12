import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../App.css";
import Table from "../../components/Table";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

export default function Cat() {
  const {id} = useParams();
  const [cat, setCat] = useState();
  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/cat/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((cat) => setCat(cat));
  }, []);

  return (
    <div className="cat">
      <Sidebar />
      <div className="catContainer">
        <Navbar />
        <div className="top">
          {cat &&
            cat.map(({ id, name, breed, age, image, breeder, email }) => (
              <>
                <div className="left" key={id}>
                  <img src={image} alt="Cat Photo" />
                  <h1>Details</h1>
                  <h3>{name}</h3>
                  <h3>{breed}</h3>
                  <h3>{age}</h3>
                  <h2>Breeder</h2>
                  <h3>{breeder}</h3>
                  <h3>{email}</h3>
                  <Button as={Link} to={`/cats/edit/${id}`}>Edit</Button>
                </div>
                <div className="right">
                  <Table />
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
