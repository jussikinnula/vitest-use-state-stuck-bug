import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import useFoo from "./useFoo";

const delay = (time: number) => new Promise((resolve) => window.setTimeout(resolve, time));

vi.mock("./useBar", () => ({
  default: () => "nice"
}));

const TestingComponent: FC = () => {
  const { id, data, structure } = useFoo();
  return (
    <>
      <p data-testid="id">{id}</p>
      <p data-testid="data">{data}</p>
      <p data-testid="something">{structure?.something}</p>
      <p data-testid="other">{structure?.other.join(",")}</p>
    </>
  );
};

describe("useFoo", () => {
  let container: HTMLDivElement;
  let root: ReactDOM.Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    if (container !== null) {
      document.body.removeChild(container);
    }
  });

  it("gets foo", async () => {
    act(() => {
      root.render(<TestingComponent />);
    });

    await act(async () => {
      await delay(500);
    });

    const id = await screen.getByTestId("id");
    expect(id.textContent).toBe("Id");

    const data = await screen.getByTestId("data");
    expect(data.textContent).toBe("Data");

    const something = await screen.getByTestId("something");
    expect(something.textContent).toBe("nice");

    const other = await screen.getByTestId("other");
    expect(other.textContent).toBe("things,to,do");
  });
});
