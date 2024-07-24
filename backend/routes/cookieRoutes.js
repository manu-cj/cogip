import { getCookie } from './../controllers/cookieController.js'
import express from "express";


const router = express.Router();

router.get('/', getCookie);


  export default router;

  