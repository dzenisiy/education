import express from "express";
import data from "./data/mock.json" with {type: "json"}

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
    console.log(data);
})