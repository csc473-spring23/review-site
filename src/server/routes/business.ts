import {
  getBusinessById,
  Business,
  Review,
  getReviewsForBusiness,
  insertReview,
  IncomingReview,
  getUserByUsername,
  ReviewResponse,
  countReviewsForBusiness,
} from "../model";
import { ApplicationError } from "../errors";
import { off } from "process";

export async function getBusinessHandler(
  business_id: string
): Promise<Business> {
  // We should return a promise that is rejected if we didn't get a business back
  const maybeBusiness = await getBusinessById(business_id);
  if (maybeBusiness === undefined) {
    return Promise.reject(ApplicationError.UNKNOWN_BUSINESS);
  } else {
    return maybeBusiness;
  }
}

export type Pagination = {
  offset: number;
  pageSize?: number;
};

type PaginatedReviews = {
  reviews: ReviewResponse[];
  nextPage: number | null;
};

export async function getBusinessReviewHandler(
  business_id: string,
  pagination?: Pagination
): Promise<PaginatedReviews> {
  // ultimately we want to return an array of reviews
  // there are two "failure" cases
  // 1) there are no reviews -- empty list -- it's not really an error
  // the fact there are no reviews is just life -- no one reviewed this business
  // 2) the business doesn't exist -- 404 (helpful to give an unknown business error message
  // consider /api/businesses/<something real>/foo )

  const { offset, pageSize } = pagination || {
    offset: undefined,
    pageSize: undefined,
  };

  const reviews = await getReviewsForBusiness(business_id, offset, pageSize);
  if (reviews.length === 0) {
    // no reviews found
    // check that the business was real
    const business = await getBusinessById(business_id);
    if (business === undefined) {
      return Promise.reject(ApplicationError.UNKNOWN_BUSINESS);
    }
  }

  let nextOffset: number;

  if (offset) {
    nextOffset = offset + reviews.length;
  } else {
    nextOffset = reviews.length;
  }

  // check if there actually is a next page
  const { count } = await countReviewsForBusiness(business_id);
  const numReviews = count;

  console.log(`num reviews: ${numReviews}; next offset: ${nextOffset}`);

  return {
    reviews: reviews,
    nextPage: numReviews == nextOffset ? null : nextOffset,
  };
}

export async function addReviewHandler(
  username: string,
  review: IncomingReview
): Promise<void> {
  // we need to find the user id to populate the actual review
  const user = await getUserByUsername(username);

  if (!user) {
    return Promise.reject(ApplicationError.UNKNOWN_USER);
  }

  const toInsert: Omit<Review, "id" | "review_id"> = {
    ...review,
    user_id: user.user_id,
  };

  return insertReview(toInsert).then(() => {
    // just so we have a promise of a void
  });
}
