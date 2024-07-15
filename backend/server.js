const express = require("express");
const dbConnect = require("./dbConnect/connect");

dbConnect();

const port = 3000;
const app = express();
app.use(express.json());

// Add routes here when they're ready

// app.use("testroute")

app.listen(port, () => {
  console.log("Port successfully open at port", port);
});
