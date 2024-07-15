import express from "express";
// import getCompanies from "../models/companiesModel.js";
import getCompanies from "../controllers/companiesController.js"
const router = express.Router();

function companiesRoutes(){

    router.get("/", getCompanies);
}



module.exports = router;
export {companiesRoutes};
