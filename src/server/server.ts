import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.get("/api", (_, res) => {
  res.send({ foo: "bar" });
});

ViteExpress.listen(app, 3000, () => {
  console.log("Server is listening on port 3000...");
});
