const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const app = express();

app.use(cors()); 
app.use(jsonServer.router('db.json')); 
app.listen(3000, () => {
    console.log('JSON Server is running on port 3000');
});


