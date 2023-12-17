require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const yogaFromAPI = require('./routes/yogaFormRoute');
app.use('/api/v1', yogaFromAPI);

app.listen(port, () =>
  console.log(`Server is working on http://localhost:${port}`)
);
