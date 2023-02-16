import { reducer, initialState } from "./store";

import {
  EditedItem,
  StateWithEditedItem,
  StateWithOneTodoItem,
  StateWithThreeTodoItem,
  StateWithTwoTodoItem,
  TodoItemOne,
  TodoItemThree,
  TodoItemTwo,
} from "../data";

describe("reducer", () => {
  it("should return initial state", () => {
    const nextState = reducer(initialState, { type: "RESET" });
    expect(nextState).toStrictEqual(initialState);
  });

  it("should return state with one todo item", () => {
    const nextState = reducer(initialState, {
      type: "ADD",
      payload: TodoItemOne,
    });
    expect(nextState).toStrictEqual(StateWithOneTodoItem);
  });

  it("should return state with two todo item", () => {
    const nextState = reducer(StateWithOneTodoItem, {
      type: "ADD",
      payload: TodoItemTwo,
    });
    expect(nextState).toStrictEqual(StateWithTwoTodoItem);
  });

  it("should return state with three todo item", () => {
    const nextState = reducer(StateWithTwoTodoItem, {
      type: "ADD",
      payload: TodoItemThree,
    });
    expect(nextState).toStrictEqual(StateWithThreeTodoItem);
  });

  it("should delete todo item from the state", () => {
    const nextState = reducer(StateWithThreeTodoItem, {
      type: "DELETE",
      payload: 3,
    });
    expect(nextState).toStrictEqual(StateWithTwoTodoItem);
  });

  it("should delete another todo item from the state", () => {
    const nextState = reducer(StateWithTwoTodoItem, {
      type: "DELETE",
      payload: 2,
    });
    expect(nextState).toStrictEqual(StateWithOneTodoItem);
  });

  it("should edit todo item of the state", () => {
    const nextState = reducer(StateWithOneTodoItem, {
      type: "EDIT",
      payload: EditedItem,
    });
    expect(nextState).toStrictEqual(StateWithEditedItem);
  });
});
