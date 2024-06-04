const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/leavemanagementdb');
const userSchema = new mongoose.Schema({
    employeeName: String,
    email: String,
    Department: String,
    Id: String,
    assignLeave: String,
})

module.exports = mongoose.model("userdata", userSchema);