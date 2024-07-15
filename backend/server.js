
import express from "express";
import dbConnect from "./dbConnect/connect.js";
import companiesRoutes from "./routes/userRoutes.js";
// import userRoutes from "./routes/userRoutes.js";


dbConnect();

const port = 3000;
const app = express();
app.use(express.json());

// Add routes here when they're ready

// app.use("/api/users", userRoutes);
app.use("/api/companies", companiesRoutes);

app.listen(port, () => {
  console.log("Port successfully open at port", port);
});
