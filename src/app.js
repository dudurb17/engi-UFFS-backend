const express = require("express");

const app = express();
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(cors());
app.use(express.json());

app.get("/", (__, res) => {
  res.json({
    mensagem: "API funcionando!",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.use(routes);
app.use(errorHandler);

module.exports = app;
