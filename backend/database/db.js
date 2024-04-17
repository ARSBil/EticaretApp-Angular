const mongoose = require("mongoose");
const uri =
  "mongodb+srv://MongoDb:xwni6fe3@eticaretdb.63teew8.mongodb.net/?retryWrites=true&w=majority&appName=ETicaretDb";

const connection = () => {
  mongoose
    .connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => console.log("MongoDb Bağlantısı Başarılı!"))
    .catch((err) => console.log("Bağlantı Hatası! Hata: " + err.message));
};

module.exports = connection;