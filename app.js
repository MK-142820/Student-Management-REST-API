const express = require("express");

const app = express();

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

app.use(express.json());

app.use(logger);

app.use("/students", studentRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});