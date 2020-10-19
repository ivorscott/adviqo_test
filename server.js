const express = require("express");
const cors = require("cors");
const seed = require("./seed");

const data = seed.getSeedData();
const delayResult = () => new Promise((res) => setTimeout(() => res(), 2000));

const app = express();
const port = 4000;

app.use(cors());

app.get("/advisors", async function (_, res) {
  await delayResult();
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
