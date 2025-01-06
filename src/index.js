const express = require('express');
const app = express();
const heroClasses = require('./routes/hero-classes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/heroes', heroClasses);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
