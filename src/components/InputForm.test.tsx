import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import InputForm from "./InputForm";
import userEvent from "@testing-library/user-event";

describe("<InputForm />", () => {
  const onAdd = jest.fn();
  it("should display a input element", () => {
    render(<InputForm dispatch={onAdd} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.getAttribute("placeholder")).toBe(
      "Enter your todos here.."
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("should display a add button", () => {
    render(<InputForm dispatch={onAdd} />);
    const buttonElement = screen.getByRole("button", { name: "Add" });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should clear textfield when add button clicked", () => {
    render(<InputForm dispatch={onAdd} />);

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", { name: "Add" });

    userEvent.type(inputElement, "this is a test");
    expect(inputElement).toHaveValue("this is a test");
    fireEvent.click(buttonElement);
    expect(inputElement).toHaveValue("");
  });

  it("should display entered text in the list", () => {
    render(<InputForm dispatch={onAdd} />);

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", { name: "Add" });

    userEvent.type(inputElement, "this is a test");
    fireEvent.click(buttonElement);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
