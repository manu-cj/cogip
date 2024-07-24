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

// const corsOptions = {
//   origin: 'http://localhost:5173', // Remplacez par l'origine de votre frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
//   allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
//   credentials: true // Pour autoriser les cookies
// };

// Middleware pour analyser le corps de la requête JSON
app.use(express.json());

// Middleware pour analyser les données de formulaire URL-encodées
app.use(express.urlencoded({ extended: true }));

// Middleware pour gérer les cookies
app.use(cookieParser());

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors({
  origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
  credentials: true
}));

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
