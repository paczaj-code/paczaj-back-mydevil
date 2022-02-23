const express = require('express');
require('dotenv').config();
const mongoConnect = require('./src/db/db').mongoConnect;
const app = express();
const categoryRouter = require('./src/router/categoryRouter')
const cors = require("cors");
app.use(cors())
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:5000", "http://localhost:3002"]
  })
);

const path = __dirname + '/dist/';
app.use(express.json());
app.use(express.static(path));
app.use('/api/', categoryRouter);
// app.get("/api/dupa",function (req,res) {
//   console.log('fwefwef');
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('req.protocol is '+ process.env.NODE_ENV);

//  });
app.get('/*', function (req, res) {
  res.sendFile(path + 'index.html');
});

mongoConnect(() => {
  app.listen(3000);
});
