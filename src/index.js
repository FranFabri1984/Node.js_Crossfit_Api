const express = require('express');
const apicache = require("apicache");
require ('dotenv').config();
const Router = require('./routes/workoutRoutes')
const {swaggerDocs} = require('./routes/swagger');

console.log('Welcome To The Crossfit Api');
const port = process.env.PORT || 3000;
const app = express();
const cache = apicache.middleware;

app.use(express.json());
app.use(cache('2 minutes'));
app.use('/api/workouts', Router)

app.listen(port, function () {
    console.log(`💥 Listening at http://localhost:${port} 💥`); 
    swaggerDocs(app, port);
});