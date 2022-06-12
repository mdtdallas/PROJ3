import { KeyboardArrowDown, KeyboardArrowUp, MoreVertOutlined } from "@mui/icons-material";
import React from "react";
import "../App.css";

export default function Featured() {
  return (
    <div className="featured">
      <div className="top">
        <div className="title">Total Revenue</div>
        <MoreVertOutlined fontSize="small" />
      </div>
      <div className="bottom">
        <p className="title">Total sales made today</p>
        <p className="amount">$42 566</p>
        <p className="title">Total Tickets sold today</p>
        <p className="amount">2500</p>
        <p className="desc">This is a description to the balance</p>
        <div className="summaryContainer">
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult positive">
                <KeyboardArrowUp fontSize="small" />
                <div className="resultAmount">$12.5k</div>
              </div>
            </div>
          </div>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Last Week</div>
              <div className="itemResult negative">
                <KeyboardArrowDown fontSize="small" />
                <div className="resultAmount">$12.5k</div>
              </div>
            </div>
          </div>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult positive">
                <KeyboardArrowUp fontSize="small" />
                <div className="resultAmount">$12.5k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
