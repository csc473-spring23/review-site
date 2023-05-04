import axios from "axios";
import { LoaderFunctionArgs } from "react-router";
import { BusinessData } from "../business/loader";

export interface SearchResults {
  results: BusinessData[];
}

export default async function searchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  const response = await axios.get<SearchResults>("/api/search", {
    params: { q: query },
  });

  return response.data;
}
