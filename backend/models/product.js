const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  imageUrl: Array,
  stock: Number,
  price: Number,
  createDate: Date,
  isActive: Boolean,
  categories: [{ type: String, ref: "Category" }],
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;