import mongoose from "mongoose";
mongoose();
import Companies from "./models/companiesModel.js";
import e from "express";
e();

// returns list of all companies


async function getCompanies(req, res){

    try{
        const companies = await Companies.find();
        res.json(companies);
    } catch(err){
        console.log(err);
    }

};



export {getCompanies};