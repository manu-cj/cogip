import mongoose from "mongoose";


const getCookie = (req ,res) => {

    // Accéder aux cookies depuis l'objet de la requête
    const cookies = req.cookies;
    console.log(cookies);

    // Par exemple, récupérer l'ID de l'utilisateur à partir du cookie
    const userId = cookies.id;
    console.log(`User ID: ${userId}`);

    res.send('Cookies are logged in the console');
    // let name = req.cookies.name;
    // console.log(name);
    // if(!name){
    //   res.cookie("name","Guest");
    //   res.send("cookie set");
    // } else {
    //   res.send(`Cookie recd for name:${name}`);
    // }
  };

  export {getCookie};