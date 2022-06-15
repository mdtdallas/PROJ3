import React from "react";
import "../App.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export default function Widgets({ type }) {
  let data;

  const amount = 100;
  const diff = 20;


  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <PersonOutlineIcon className="icon crimson" />,
      };
      break;
    case "order":
      data = {
        title: "TICKETS",
        isMoney: false,
        link: "View all sales",
        icon: <ShoppingCartOutlinedIcon className="icon" />,
    };
    break;
    case "earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "See all earnings",
        icon: <AttachMoneyOutlinedIcon className="icon" />,
    };
    break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See balance",
        icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
    };
    break;
    default: {}
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && '$'} {amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ArrowUpwardIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
}