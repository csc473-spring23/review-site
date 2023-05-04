import axios from "axios";

export async function postReview(
  business_id: string,
  reviewText: string,
  jwt?: string
) {
  if (!jwt) {
    return Promise.reject("not logged in");
  }
  // I need to assemble a request to the backend
  await axios.post(
    `/api/business/${business_id}/review`,
    {
      business_id: business_id,
      text: reviewText,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
}
