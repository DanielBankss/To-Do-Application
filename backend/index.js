const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create", async (req, res) => {
  await prisma.items
    .create({
      data: {
        value: req.query.value,
        date: req.query.time,
      },
    })
    .then((resp) => {
      return res.json(resp);
    })
    .catch((err) => {
      return console.log(err);
    });
});

app.get("/retrieve", async (req, res) => {
  return res.json(await prisma.items.findMany());
});

app.delete("/delete/:id", async (req, res) => {
  await prisma.items
    .delete({
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(404);
    });
});

app.listen(port, () => {
  console.log(`todo-backend: listening on port ${port}`);
});
