const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb').catch((error) => {
  console.error('Error conectando a MongoDB:', error);
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6a8122ee83f630b2f2fedc39',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('/prueba', (req, res) => {
  res.send('Hola');
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso solicitado no encontrado',
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
