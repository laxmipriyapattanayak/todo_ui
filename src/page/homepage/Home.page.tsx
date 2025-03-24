import { Button, TextField } from "@mui/material";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const HomePage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [error, setError] = useState("please enter something");

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setInput(e.target.value);
    if (e.target.value.length === 0) {
      setError("please enter something");
    } else {
      setError("");
    }
  };

  const handleClick = () => {
    // if (input.length === 0) {
    //   setError("please input something");
    //   return;
    // } else {
    //   setError("");
    // }
    navigate(`/user/${input}`);
  };

  return (
    <>
      <div className="home-wrapper">
        <TextField
          id="outlined-basic"
          label="user name"
          variant="outlined"
          onChange={handleChange}
          placeholder="Enter user name..."
          size="medium"
          // error={!!error.length}
          // helperText={error}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={handleClick}
          disabled={!!error.length}
        >
          Go
        </Button>
      </div>
    </>
  );
};
