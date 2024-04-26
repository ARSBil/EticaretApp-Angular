const express = require("express");
const router = express.Router();
const response = require("../services/response.service");
const Basket = require("../models/basket");
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
router.post("/add", async (req, res) => {
  response(res, async () => {
    const { userId, productId, price, quantity } = req.body;

    let product = await Product.findById(productId);

    if (product == null || (product != null && !product.isActive)) {
      res.status(500).json({ message: "Ürüne Ulaşılamadı!" });
    } else if (product != null && product.stock <= 0) {
      res.status(500).json({ message: "Ürün Stoğu Tükenmiştir!" });
    } else if (product != null && product.stock - quantity < 0) {
      res.status(500).json({
        message:
          "Ürün Stoğu istediğiniz adet i karşılamıyor! " +
          product.stock +
          " kadar sepete ekleye bilirsiniz!",
      });
    } else {
      let basket = new Basket();
      let b = await await Basket.aggregate([
        {
          $match: { userId: userId, productId: product._id },
        },
      ]);
      if (b.length > 0) {
        basket = b[0];
        basket.quantity += quantity;
        if (basket.quantity <= 0) {
          await Basket.findByIdAndDelete(basket._id);
        } else {
          await Basket.findByIdAndUpdate(basket._id, basket);
        }
      } else {
        basket._id = uuidv4();
        (basket.userId = userId),
          (basket.productId = productId),
          (basket.price = price);
        basket.quantity = quantity;

        await basket.save();
      }
      product.stock -= quantity;
      await Product.findByIdAndUpdate(productId, product);
      res.json({ message: "Ürün başarıyla sepete eklendi!" });
    }
  });
});

router.post("/removeById", async (req, res) => {
  response(res, async () => {
    const { _id, userId } = req.body;
    let basket = await Basket.findById(_id);
    if (basket == null) {
      res.status(500).json({ message: "Sepet deki Ürüne Ulaşılamadı!" });
    } else if (basket != null && basket.userId != userId) {
      res.status(500).json({ message: "Sepet deki Ürüne size ait değildi!" });
    } else {
      await Basket.findByIdAndDelete(basket._id);
      let product = await Product.findById(basket.productId);
      product.stock += basket.quantity;
      await Product.findByIdAndUpdate(basket.productId, product);
      res.json({ message: "Ürün başarıyla sepetten silindi." });
    }
  });
});

router.post("/", async (req, res) => {
  response(res, async () => {
    const { userId } = req.body;
    const baskets = await Basket.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
    ]);
    res.json(baskets);
  });
});

router.post("/getCount", async (req, res) => {
  response(res, async () => {
    const { userId } = req.body;
    let count = await Basket.find({ userId: userId }).count();
    res.json({ count: count });
  });
});

module.exports = router;
