const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const connection = require("./database/db");
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("", (req, res) => {
//   res.json({ message: "Api İsteği Başarılı bir şekilde çalışıyor" });
// });

const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

connection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Uygulama http://localhost:" + port + " portundan ayağa kalktı!");
});
