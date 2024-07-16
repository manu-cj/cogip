import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dbConnect from "./dbConnect/connect.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import companiesRoutes from "./routes/companiesRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dbConnect();

const app = express();
const port = 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(
  "/uploads",
  express.static(join(__dirname, "public/assets/img/people"))
);

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/images", imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
