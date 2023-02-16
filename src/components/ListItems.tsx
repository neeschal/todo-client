import { IconButton, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Action, todo } from "../store/types";
import { Box } from "@mui/system";

interface IProps {
  todo: todo;
  dispatch: React.Dispatch<Action>;
}

const ListItems = ({ todo, dispatch }: IProps) => {
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log(error);
      }
    }
  };

  const deleteHandler = () => {
    dispatch({ type: "DELETE", payload: todo.id });
    fetchData();
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "#34479d",
        color: "white",
        marginBottom: "1rem",
        borderRadius: "5px",
        padding: "1rem",
      }}
    >
      {todo.description}
      <Box>
        <IconButton edge="end" aria-label="comments" onClick={deleteHandler}>
          <DeleteIcon sx={{ color: "#ff5252" }} />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default ListItems;
