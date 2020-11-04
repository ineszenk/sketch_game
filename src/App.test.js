import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Game } from "./Game";
import { Canvas } from "./Components/Canvas";

test("renders the Game component", () => {
  const tree = renderer.create(<Game />).toJSON();
  expect(tree).toMatchSnapshot();
});

// describe("Test the <Canvas /> component", () => {
//   it("Canvas renders correctly", () => {
//     const tree = renderer.create(<Canvas />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
