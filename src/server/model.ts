import knex from "./db";
import type { Knex } from "knex";
import { DateTime } from "luxon";
import * as argon2 from "argon2";

// define some types that represent the records in our database
export interface User {
  id: number;
  user_id: string;
  name: string;
  join_date: DateTime;
  username: string;
  password: string;
}

const Users: () => Knex.QueryBuilder<User> = () => knex<User>("users");

export const getUserById = (user_id: string) => {
  // build my user lookup query
  return Users().where("user_id", user_id).first();
};

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  // usernames are unique
  return Users().where("username", username).first();
}

export async function setPassword(id: number, password: string) {
  const hashedPassword = await argon2.hash(password);
  console.log(`hashed password: ${hashedPassword}`);
  console.log(`setting password for user id ${id}`);
  return Users().where("id", id).update({ password: hashedPassword });
}

type UserWithoutId = Omit<User, "id">;

export const insertUser = (userData: UserWithoutId) => {
  return knex.insert(userData).into("users");
};

export interface Business {
  id: number;
  business_id: string;
  name: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  is_open: boolean;
  latitude: number;
  longitude: number;
  //hours: string; // doesn't exist yet; what's the right way to store it?
}

export const Businesses: () => Knex.QueryBuilder<Business> = () =>
  knex<Business>("businesses");

export const insertBusiness = (businesData: Omit<Business, "id">) => {
  return knex.insert(businesData).into("businesses");
};

export async function getBusinessById(
  business_id: string
): Promise<Business | undefined> {
  return Businesses().where("business_id", business_id).first();
}

export interface Review {
  id: number;
  review_id: string;
  user_id: string;
  business_id: string;
  text: string;
  stars?: number;
  useful_count?: number;
}
export type IncomingReview = Omit<
  Review,
  "id" | "review_id" | "useful_count" | "user_id"
>;

const Reviews: () => Knex.QueryBuilder<Review> = () => knex<Review>("reviews");

export interface ReviewResponse {
  name: string;
  text: string;
  stars?: number;
  useful_count?: number;
  review_id: string;
}

// TODO: Make this paginated.
export async function getReviewsForBusiness(
  business_id: string,
  offset?: number,
  limit?: number
): Promise<ReviewResponse[]> {
  return knex
    .select<ReviewResponse[]>(
      "name",
      "text",
      "stars",
      "useful_count",
      "review_id"
    )
    .from("reviews")
    .innerJoin("users", "users.user_id", "=", "reviews.user_id")
    .where("business_id", business_id)
    .offset(offset || 0)
    .limit(limit || 10);
}

export async function countReviewsForBusiness(
  business_id: string
): Promise<{ count: number }> {
  return Reviews().where("business_id", business_id).count().first();
}

export async function insertReview(review: IncomingReview): Promise<Review> {
  // in theory, I have everything already in the Review object except the id
  return Reviews().insert(review);
}
