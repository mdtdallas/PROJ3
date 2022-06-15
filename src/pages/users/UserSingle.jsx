import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import EditUser from "./EditUser";


export default function UserSingle() {
  let {id} = useParams();
    const [user, setUser] = useState();
     // On submit headers contain the token for the JWT verification.
    useEffect(() => {
        fetch(`https://proj2-api.herokuapp.com/api/user/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
          credentials: 'include'
        })
        .then(res => res.json())
        .then((user) => {
          setUser(user);
        })
    }, [])

    return (
        <div className="single">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
              <Link to={`/users/edit/${id}`} element={<EditUser />}>
              <div className="editButton">Edit</div>
            </Link>
                <h1 className="title">Information</h1>
                {user && user.map(({ name, email, phone, userType, image}) => (
                    <div className="detailContainer">
                  <div className="item">
                    <Avatar
                      src={image}
                      alt="Avatar"
                      className="itemImage"
                      width="100%"
                    />
                  </div>
                  <div className="details">
                    <h1 className="itemTitle">{name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email</span>
                      <span className="itemValue">{email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone</span>
                      <span className="itemValue">{phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">User Type</span>
                      <span className="itemValue">{userType}</span>
                    </div>
                  </div>
                </div>
                ))}
                
              </div>
              <div className="right">
                 
              </div>
            </div>
            <div className="singleBottom">
              <h1 className="title">Latest Shows</h1>
              <Table />
            </div>
          </div>
        </div>
      );
}
