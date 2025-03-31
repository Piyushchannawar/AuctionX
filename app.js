const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const sequelize = require('./src/config/dbConnect');
const Roles = require('./src/models/role');
const user = require('./src/models/user');

app.use(express.json());
app.use(cors());


// server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
   try {
    // db connection
   await sequelize.authenticate()
   console.log('Database connected successfully');
   await Roles.sync({ force : false});
   await user.sync({ force : false});
   
   } catch (error) {
      console.log('Error in starting server:', error);
   }
});