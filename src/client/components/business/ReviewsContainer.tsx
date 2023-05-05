import { useState } from "react";
import Reviews from "../reviews/Reviews";

interface Props {
  business_id: string;
}

export default function ReviewsContainer({ business_id }: Props) {
  const [offset, setOffset] = useState<number>(0);
  const [nextPageOffset, setNextPageOffset] = useState<number | null>();

  const forwardButton =
    nextPageOffset != null ? <button>Next Page</button> : <></>;

  return (
    <div>
      <Reviews
        business_id={business_id}
        offset={offset}
        setNextPage={setNextPageOffset}
      ></Reviews>
      {forwardButton}
    </div>
  );
}
