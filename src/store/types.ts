export type todo = {
  id: number;
  description: string;
};

export type todoWithoutId = {
  description: string;
};

export type State = {
  todos: todo[];
};

export type AddAction = {
  type: "ADD";
  payload: todo;
};

export type AddListAction = {
  type: "ADDLIST";
  payload: todo[];
};

export type DeleteAction = {
  type: "DELETE";
  payload: number;
};

export type EditAction = {
  type: "EDIT";
  payload: todo;
};

export type ResetAction = {
  type: "RESET";
};

export type Action =
  | AddAction
  | DeleteAction
  | EditAction
  | ResetAction
  | AddListAction;
