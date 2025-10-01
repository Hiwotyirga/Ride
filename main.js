const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
res.send("Hello Baby!");
});
const userRouter = require("./src/module/routes/UserManagment/user")
app.use('/api/users', userRouter);

const driverRouter = require("./src/module/routes/UserManagment/driver")
app.use("/api/driver", driverRouter)

const adminRouter = require("./src/module/routes/UserManagment/admin")
app.use("/api/admin", adminRouter)

const vechileRouter = require("./src/module/routes/vechile/vechile.router")
app.use("/api/vechile", vechileRouter)


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