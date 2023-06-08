import React from "react";
import { render } from "@testing-library/react";
import ErrorPage from "../components/specials/ErrorPage";

describe("ErrorPage", () => {
  it("displays error message", () => {
    const errorMessage = "Something went wrong!";
    const { getByText } = render(<ErrorPage message={errorMessage} />);
    const errorMessageElement = getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
