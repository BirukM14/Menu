const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/api');


// Initialize dotenv to manage environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true,                
}));

app.use(bodyParser.json());

// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGO_URI, )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error: ", err));

// Set up routes
app.use('/api', routes); 



const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
