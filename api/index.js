const express = require('express');
const app = express();
const heroClasses = require('./routes/heroes/hero-classes');
const products = require('./routes/products/products');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use('/api/v1/heroes', heroClasses);
app.use('/api/v1/products', products);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
