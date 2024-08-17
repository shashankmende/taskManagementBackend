require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/db');
const router = require('./router/router'); // Import the routes

const app = express();

app.use(express.json());
app.use(cors());


app.use('/auth', router);

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
});
