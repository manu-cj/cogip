import mongoose from "mongoose";


const getCookie = (req ,res) => {
  res.json(req.cookies);
  };

  const postCookie = (req, res) =>{

    const { name, value } = req.body;
    res.cookie(name, value, { httpOnly: true });
    res.json({ message: 'Cookie set successfully' });
  }
  export {getCookie, postCookie};