const mongoose = require("mongoose");

const PendingUserSchema = new mongoose.Schema({
    email : {type:String, required: true, unique: true},
    password : {type:String, required:true},
    username : {type:String, default: "B Person"},
    profilePic : {type:String, default: ""},
    isAdmin : {type : Boolean, default:false}, 
}, {timestamps: true});

module.exports = mongoose.model("PendingUser", PendingUserSchema);