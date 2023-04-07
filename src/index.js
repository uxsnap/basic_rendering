import { render, createElement } from "./main/render";

export const renderTests = [
  5,
  6,
  123123,
  "hey there fella",
  `template strings ${5555}`,
  null,
  undefined,
  true,
  false,
  { a: { b: { c: "d" } } },
  [1, 2, 3, 4, 5],
  <ul>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>,
  <ul>
    <li>{true}</li>
    <li>{false}</li>
    <li>{5673}</li>
    <li>{"Heheh"}</li>
    <li>{null}</li>
    <li>
      <p>Inner {5}</p>
    </li>
  </ul>,
];

for (let i = 0; i < renderTests.length; i++) {
  render(
    <div>
      Test {i} -{">"} {renderTests[i]}
    </div>,
    document.getElementById("app")
  );
}
