import { getCookie, postCookie } from './../controllers/cookieController.js'
import express from "express";


const router = express.Router();

router.get('/', getCookie);

router.post('/', postCookie);

  export default router;

  