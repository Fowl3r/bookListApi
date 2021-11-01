const express = require('express');
const router = require('./router');
const app = express();
const port = 3002


//Routes

app.use(express.json());
app.use(router);



app.listen(port, () => 
console.log(`Example app listening  at http://localhost:${port}`))