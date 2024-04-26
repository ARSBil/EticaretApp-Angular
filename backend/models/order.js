const mongoosee = require("mongoose");
const orderSchema = new mongoosee.Schema({
  _id: String,
  productId: String,
  price: Number,
  quantity: Number,
  userId: String,
  createDate: Date,
});

const Order = mongoosee.model("Order", orderSchema);

module.exports = Order;
