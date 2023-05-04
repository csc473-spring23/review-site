import { useLoaderData } from "react-router";
import { BusinessData } from "./loader";
import { FormEvent } from "react";
import { postReview } from "./business_service";
import { useAuth } from "../../auth/auth_context";

function buildLocationString(businessData: BusinessData) {
  return businessData.street;
}

export default function Business(): JSX.Element {
  // yet another react-router specific hook
  const businessData = useLoaderData() as BusinessData;
  const auth = useAuth();

  function submitReview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { reviewbox } = Object.fromEntries(formData.entries());
    // now we need to send the review to the backend
    console.log("Sending a new review", reviewbox);
    postReview(businessData.business_id, reviewbox as string, auth.user?.token)
      .then(() => alert("Review posted!"))
      .catch(() => alert("Review post failed!"));
  }

  return (
    <div className="p-4">
      <h1 className="h1">{businessData.name}</h1>
      <div className="grid grid-cols-4">
        <div>Location</div> <div>{buildLocationString(businessData)}</div>
      </div>
      <div>
        <form onSubmit={submitReview}>
          <label id="review" htmlFor="review-box">
            Leave a review!
          </label>
          <div className="border border-1">
            <textarea
              name="reviewbox"
              className="border-2"
              aria-labelledby="review"
              id="review-box"
            ></textarea>
          </div>
          <button className="bg-blue" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
