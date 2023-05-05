import { useLoaderData } from "react-router";
import { SearchResults } from "./loader";
import { BusinessData } from "../business/loader";
import { Link } from "react-router-dom";

function Result({ business }: { business: BusinessData }) {
  return (
    <div>
      <Link to={"/business/" + business.business_id}>
        <strong>{business.name}</strong>
      </Link>{" "}
      {business.street}
    </div>
  );
}

export default function SearchResult(): JSX.Element {
  const results = useLoaderData() as SearchResults;

  return (
    <div>
      {results.results.map((it) => (
        <Result key={it.business_id} business={it}></Result>
      ))}
    </div>
  );
}
