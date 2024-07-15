import express from "express";
import dbConnect from "./dbConnect/connect.js";
import userRoutes from "./routes/userRoutes.js";
import companiesRoutes from "./routes/companiesRoutes.js";

dbConnect();

const port = 3000;
const app = express();
app.use(express.json());

// Adding routes
app.use("/api/users", userRoutes);
app.use("/api/companies", companiesRoutes);

app.listen(port, () => {
  console.log("Port successfully open at port", port);
});
