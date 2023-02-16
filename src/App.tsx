import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { CircularProgress, Container, List } from "@mui/material";
import { reducer, initialState } from "./store/store";
import InputForm from "./components/InputForm";
import ListItems from "./components/ListItems";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/todos/");

      if (!res.ok) {
        throw new Error("something went wrong!");
      }

      const data = await res.json();

      dispatch({ type: "ADDLIST", payload: data });
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container sx={{ width: "30%", margin: "5rem auto", textAlign: "center" }}>
      <InputForm dispatch={dispatch} />

      {loading && <CircularProgress />}
      {!loading && (
        <List sx={{ width: "100%" }}>
          {state?.todos.map((todo) => (
            <ListItems key={todo.id} todo={todo} dispatch={dispatch} />
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
