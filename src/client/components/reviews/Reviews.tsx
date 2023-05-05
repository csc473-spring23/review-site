import axios from "axios";
import { useEffect, useState } from "react";

type ReviewsProps = {
  business_id: string;
  offset: number;
  setNextPage: (n: number | null) => void;
};

type Review = {
  review_id: string;
  name: string;
  text: string;
  stars?: number;
  useful_count?: number;
};

function Review({ review }: { review: Review }): JSX.Element {
  return (
    <div className="border p-2">
      <div>
        {review.name} Useful: {review.useful_count || 0}
      </div>
      <div>{review.text}</div>
    </div>
  );
}

type ReviewPage = {
  reviews: Review[];
  nextPage: number | null;
};

export default function Reviews({
  business_id,
  offset,
  setNextPage,
}: ReviewsProps): JSX.Element {
  // we need to actually retrieve the reviews for the business
  // /api/business/:business_id/review/

  const [reviews, setReviews] = useState<Array<Review>>();

  useEffect(() => {
    const requestOptions = { params: { offset: offset } };

    // need to retrieve the reviews for the business id and update the state
    axios
      .get<ReviewPage>(`/api/business/${business_id}/review`, requestOptions)
      .then((resp) => {
        console.log("Review response: ", resp.data);
        setReviews(resp.data.reviews);
        setNextPage(resp.data.nextPage);
      })
      .catch((err) => console.error("Oops", err));
  }, [business_id, offset]);

  return (
    <div>
      {reviews?.map((it) => (
        <Review key={it.review_id} review={it} />
      ))}
    </div>
  );
}
