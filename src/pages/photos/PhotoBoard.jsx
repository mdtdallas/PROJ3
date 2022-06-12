import { Button, Card, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../App.css";

export default function PhotoBoard() {
  const [cats, setCats] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function handleDelete(id) {
    alert(`Photo ${id} Deleted`);
  }

  useEffect(() => {
    setLoading(true)
    fetch("https://proj2-api.herokuapp.com/api/cats", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((cats) => setCats(cats))
      .catch((err) => {
        setError(err);
        setCats(null);
      })
      .finally(() => {setLoading(false)})
  }, []);


  return (
    <div className="single">
      <div className="spinner">
      {loading && <div><CircularProgress color="success" className="iconSpinner" size={400}/></div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      </div>
      {cats &&
        cats.map(({ id, image }) => (
          <Card className="detailContainer" key={id}>
            <div className="comments">
              <img src={image} />
              <Button variant='contained' color='error' onClick={() => {handleDelete(id)}}>Delete</Button>
            </div>
          </Card>
        ))}
    </div>
  );
}
