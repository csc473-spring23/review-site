import axios from "axios";
import { LoaderFunctionArgs } from "react-router";

export type BusinessData = {
  business_id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postcode: string;
  is_open: boolean;
  latitude: number;
  longitude: number;
};

export default async function businessLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Error("Expected params.id!");
  }

  // actually fetch the data
  const response = await axios.get<BusinessData>(`/api/business/${id}`);
  return response.data;
}
