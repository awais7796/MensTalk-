import express from "express";
// import chat.router from "./router/chat.router.js"
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, (req, res) => {
  console.log("app is running ");
});
