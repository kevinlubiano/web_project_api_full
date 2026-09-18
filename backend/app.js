require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb").catch((error) => {
  console.error("Error conectando a MongoDB:", error);
});

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.get("/prueba", (req, res) => {
  res.send("Hola");
});

app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
