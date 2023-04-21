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

const Businesses: () => Knex.QueryBuilder<Business> = () =>
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
  stars: number;
  useful_count: number;
}

const Reviews: () => Knex.QueryBuilder<Review> = () => knex<Review>("reviews");

// TODO: Make this paginated.
export async function getReviewsForBusiness(
  business_id: string
): Promise<Review[]> {
  return Reviews().where("business_id", business_id);
}
