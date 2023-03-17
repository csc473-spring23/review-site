import knex from "./db";
import type { Knex } from "knex";

// define some types that represent the records in our database
export interface User {
  id: number;
  user_id: string;
  name: string;
  join_date: EpochTimeStamp;
}

const Users: () => Knex.QueryBuilder<User> = () => knex<User>("users");

export const getUserById = (user_id: string) => {
  // build my user lookup query
  return Users().where("user_id", user_id).first();
};

export interface Business {
  id: number;
  business_id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  postcode?: string;
  is_open: boolean;
  latitude: number;
  longitude: number;
  //hours: string; // doesn't exist yet; what's the right way to store it?
}

export interface Review {
  id: number;
  review_id: string;
  author_id: string;
  business_id: string;
  text: string;
  // stars:  not there yet
  useful_count: number;
}

const Reviews: () => Knex.QueryBuilder<Review> = () => knex<Review>("reviews");

// TODO: Make this paginated.
export function getReviewsForBusiness(business_id: string): Review[] {
  return Reviews().where("business_id", business_id);
}
