import { FormEvent } from "react";
import { postReview } from "./business_service";
import { useAuth } from "../../auth/auth_context";

interface Props {
  business_id: string;
}

export default function SubmitReview({ business_id }: Props): JSX.Element {
  const auth = useAuth();

  function submitReview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { reviewbox } = Object.fromEntries(formData.entries());
    // now we need to send the review to the backend
    console.log("Sending a new review", reviewbox);
    postReview(business_id, reviewbox as string, auth.user?.token)
      .then(() => alert("Review posted!"))
      .catch(() => alert("Review post failed!"));
  }

  return (
    <form onSubmit={submitReview}>
      <label id="review" htmlFor="review-box">
        Leave a review!
      </label>
      <div className="border border-2">
        <textarea
          name="reviewbox"
          className="border-3"
          aria-labelledby="review"
          id="review-box"
        ></textarea>
      </div>
      <button className="bg-blue" type="submit">
        Submit
      </button>
    </form>
  );
}
