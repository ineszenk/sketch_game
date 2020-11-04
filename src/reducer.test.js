/* eslint-disable jest/valid-expect */
import React, { useReducer } from "react";
import { pointReducer } from "./reducer";
import { mount } from "enzyme";

const TestReducer = () => {
  const [points, dispatch] = useReducer(pointReducer, 0);

  return (
    <div>
      <button id="increment" onClick={() => dispatch({ type: "increment" })} />
      <button id="decrement" onClick={() => dispatch({ type: "decrement" })} />
      <button id="reset" onClick={() => dispatch({ type: "reset" })} />
      <p>{points}</p>
    </div>
  );
};

describe("Testing the score counter", () => {
  const wrapper = mount(<TestReducer />);

  it("initial score set to 0", () => {
    expect(wrapper.find("p").text(0));
  });

  it("increment score + 1", () => {
    wrapper.find({ id: "increment" }).simulate("click");
    expect(wrapper.find("p").text(1));
  });

  it("decrement score - 1", () => {
    wrapper.find({ id: "decrement" }).simulate("click");
    expect(wrapper.find("p").text(2));
  });

  it("reset score", () => {
    wrapper.find({ id: "reset" }).simulate("click");
    expect(wrapper.find("p").text(0));
  });
});
