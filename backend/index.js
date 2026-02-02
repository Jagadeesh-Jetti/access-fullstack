require('dotenv').config();
const express = require('express');
const odbc = require('odbc');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const DSN = process.env.DSN;

app.get('/api/students', async (req, res) => {
  try {
    const connection = await odbc.connect(`DSN={$DSN}`);
    const result = await connection.query('SELECT * FROM students');
    connection.close();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
