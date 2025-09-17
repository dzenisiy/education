import express from "express";
import skiTerms from "./ski-terms.json" with { type: "json"}

const app = express();

app.use("/", express.static("./client"));
app.get("/dictionary", (req, res) => {
  res.json(skiTerms);
})

app.listen(3000, () => console.log("ski dictionary running on 3000"));