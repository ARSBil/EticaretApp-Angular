const mongoose = require("mongoose");

const userShema = new mongoose.Schema( {
_id: String,
name: {
    type: String,
    required: true
},
email: {
    type: String,
    requred: true,
    unique: true
},
password: {
    type: String,
    requred: true
},
isAdmin:  Boolean,
createdDate: Date
});
const User = mongoose.model("User",userShema);

module.exports = User;