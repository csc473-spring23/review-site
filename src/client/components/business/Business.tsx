import { useLoaderData } from "react-router";
import { BusinessData } from "./loader";
import SubmitReview from "./SubmitReview";
import ReviewsContainer from "./ReviewsContainer";

function buildLocationString(businessData: BusinessData) {
  return businessData.street;
}

export default function Business(): JSX.Element {
  // yet another react-router specific hook
  const businessData = useLoaderData() as BusinessData;

  return (
    <div className="p-4">
      <h1 className="h1">{businessData.name}</h1>
      <div className="grid grid-cols-4">
        {/* TODO: display the other business data too */}
        <div>Location</div> <div>{buildLocationString(businessData)}</div>
      </div>
      <ReviewsContainer
        business_id={businessData.business_id}
      ></ReviewsContainer>
      <div className="p-10">
        <SubmitReview business_id={businessData.business_id} />
      </div>
    </div>
  );
}
