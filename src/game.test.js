import React from "react";
import renderer from "react-test-renderer";
import { Controls } from "./Components/Control";
import { Canvas } from "./Components/Canvas";
import { mount } from "enzyme";
import { Game } from "./Game";

describe("<Game />", () => {
  const GameComponent = (
    <Game>
      <Controls />
      <Canvas />
    </Game>
  );
  const wrapper = mount(GameComponent);

  it("renders correctly", () => {
    const tree = renderer.create(GameComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders properly Controls", () => {
    expect(wrapper.contains(<Controls />)).toEqual(true);
  });

  it("renders properly Canvas", () => {
    expect(wrapper.contains(<Canvas />)).toEqual(true);
  });
});
