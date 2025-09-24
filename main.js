const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json()); 

const userRouter = require('./src/module/services/user');

app.get('/', (req, res) => {
  console.log("Hello world");
  res.send("Hello World!");
});

app.use('/api/users', userRouter);

const port = 8080;

mongoose.connect("mongodb+srv://mongo:admin@nodeapi.4ixy3p1.mongodb.net/?retryWrites=true&w=majority&appName=nodeApi")
  .then(() => {
    console.log("✅ Database is connected successfully");

    app.listen(port, () => {
      console.log(`📘 Server is running at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Connection failed!", err);
  });
