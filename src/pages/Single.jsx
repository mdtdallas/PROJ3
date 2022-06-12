import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Avatar from "@mui/material/Avatar";
import Table from "../components/Table";

export default function Single() {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="detailContainer">
              <div className="item">
                <Avatar
                  src="https://picsum.photos/250"
                  alt=""
                  className="itemImage"
                />
              </div>
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email</span>
                  <span className="itemValue">jane@mail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone</span>
                  <span className="itemValue">04787845452</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Type</span>
                  <span className="itemValue">user</span>
                </div>
              </div>
            </div>
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
