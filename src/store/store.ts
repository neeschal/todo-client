import { State, Action } from "./types";

export const initialState: State = {
  todos: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case "ADDLIST": {
      return {
        todos: action.payload,
      };
    }
    case "DELETE": {
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload;
        }),
      };
    }
    case "EDIT": {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              description: action.payload.description,
            };
          }
          return todo;
        }),
      };
    }
    default:
      return state;
  }
};
