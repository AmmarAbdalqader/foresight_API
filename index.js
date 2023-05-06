const express = require('express');
const user = require("./routes/user.route");
const categories = require("./routes/categories.route");

const app = express();
app.use(express.json());

const port = 3030;

app.use("/api/users", user);
app.use("/api/categories", categories);
app.use(express.json());

app.listen(port, () => {
    console.log("Welcome to Foresight Application");
    console.log(`Live at port ${port}`);
});

module.exports = app;