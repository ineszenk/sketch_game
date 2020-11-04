import React from "react";
import renderer from "react-test-renderer";
import { Controls } from "./Components/Control";
import { Canvas } from "./Components/Canvas";

test("renders the Canvas component", () => {
  const tree = renderer.create(<Canvas />).toJSON();
  expect(tree).toMatchSnapshot();
});
