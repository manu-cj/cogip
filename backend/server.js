import express from "express";
import cors from "cors";
import dbConnect from "./dbConnect/connect.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import companiesRoutes from "./routes/companiesRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import miscRoutes from "./routes/miscRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import cookieRoutes from "./routes/cookieRoutes.js";
import cookieParser from 'cookie-parser';
dbConnect();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/", miscRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/cookie", cookieRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
