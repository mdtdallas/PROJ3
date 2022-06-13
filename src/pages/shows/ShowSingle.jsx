import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import EditShow from "./EditShow";

export default function ShowSingle() {
  const [show, setShow] = useState();
  let { id } = useParams();

  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/showsShowID/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((show) => setShow(show));
  }, []);

  return (
    <div>
      {show &&
        show.map(
          ({
            id,
            title,
            location,
            image,
            judges,
            date,
            council,
            ticket_price,
            ticket_count,
          }) => (
            <div className="single" key={id}>
              <Sidebar />
              <div className="singleContainer">
                <Navbar />

                <div className="top">
                  <div className="left">
                    <img src={image} alt='of cat show event'/>
                    <Link to={`/shows/edit/${id}`} element={<EditShow />}>
                      <div className="editButton">Edit</div>
                    </Link>
                  </div>

                  <div className="right">
                    <div className="singleContainer">
                      <h1>
                        <span>Title: &nbsp;</span>
                        {title}
                      </h1>
                      <p>
                        <span>Location: &nbsp;</span>
                        {location}
                      </p>
                      <p>
                        <span>Council: &nbsp;</span>
                        {council}
                      </p>
                      <p>
                        <span>Price: &nbsp;</span>${ticket_price}
                      </p>
                      <p>
                        <span>Judges: &nbsp;</span>
                        {judges}
                      </p>
                      <p>
                        <span>Tickets Remaining: &nbsp;</span>
                        {ticket_count}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <span>Show Date: &nbsp;</span>
                  {date}
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
}
