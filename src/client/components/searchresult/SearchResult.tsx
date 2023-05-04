import { useLoaderData } from "react-router";
import { SearchResults } from "./loader";
import { BusinessData } from "../business/loader";

function Result({ business }: { business: BusinessData }) {
  return <div>{JSON.stringify(business)}</div>;
}

export default function SearchResult(): JSX.Element {
  const results = useLoaderData() as SearchResults;

  return (
    <div>
      {results.results.map((it) => (
        <Result business={it}></Result>
      ))}
    </div>
  );
}
