import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const HomePage = () => {
  const naviagate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("Please enter something");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setInput(e.target.value);
    if (e.target.value.length === 0) {
      setError("Please enter something");
    } else {
      setError("");
    }
  };
  const handleClick = () => {
    naviagate(`/user/${input}`);
  };

  return (
    <>
      <div className="home-wrapper">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={handleChange}
          placeholder="Enter Username..."
          size="medium"
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
