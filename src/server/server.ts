import express from "express";
import ViteExpress from "vite-express";

import { getBusinessHandler } from "./routes/business";

const app = express();

app.get("/api/business/:business_id", (req, resp) => {
  // step 1: extract the business id
  const { business_id } = req.params;
  const responseData = getBusinessHandler(business_id);
  resp.send(responseData);
});

ViteExpress.listen(app, 3000, () => {
  console.log("Server is listening on port 3000...");
});
