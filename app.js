const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


// server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});