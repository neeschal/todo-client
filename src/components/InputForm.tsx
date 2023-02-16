import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Action, todoWithoutId } from "../store/types";

interface Iprops {
  dispatch: React.Dispatch<Action>;
}

const InputForm = ({ dispatch }: Iprops) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (todo: todoWithoutId) => {
    try {
      const res = await fetch("http://localhost:3000/todos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });

      if (!res.ok) {
        throw new Error("something went wrong!");
      }

      const data = await res.json();

      dispatch({ type: "ADD", payload: data });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log(error);
      }
    }
  };

  const handleClick = () => {
    if (text.length < 5) {
      setOpen(true);
    } else {
      const data = {
        description: text,
      };

      fetchData(data);
      setText("");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box marginBottom="1rem" display="flex" alignItems="center" gap=".5rem">
      <TextField
        placeholder="Enter your todos here.."
        value={text}
        onChange={(event) => setText(event.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        sx={{ padding: ".9rem 1.5rem" }}
      >
        Add
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Enter atleast 5 characters.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InputForm;
