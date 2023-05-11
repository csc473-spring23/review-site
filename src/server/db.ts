import { knex as knx } from "knex";

// actual connection details for our application
const knex = knx({
  client: "postgres",
  connection: {
    host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    database: "default",
  },
  debug: process.env.NODE_ENV == "development",
});

export default knex;
