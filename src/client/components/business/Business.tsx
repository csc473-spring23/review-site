import { useLoaderData } from "react-router";
import { BusinessData } from "./loader";

function buildLocationString(businessData: BusinessData) {
  return businessData.street;
}

export default function Business(): JSX.Element {
  // yet another react-router specific hook
  const businessData = useLoaderData() as BusinessData;

  return (
    <>
      <h1 className="h1">{businessData.name}</h1>
      <div className="grid grid-cols-4">
        <div>Location</div> <div>{buildLocationString(businessData)}</div>
      </div>
    </>
  );
}
