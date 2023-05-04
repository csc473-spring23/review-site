import { Form } from "react-router-dom";

export default function SearchBox(): JSX.Element {
  return (
    <Form method="GET" action="/search">
      <input
        className="border mr-2 p-2"
        type="text"
        name="q"
        aria-label="search box"
      ></input>
      <button className="border p-2" type="submit">
        Search!
      </button>
    </Form>
  );
}
