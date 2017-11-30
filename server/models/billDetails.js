const mongoose = require("mongoose"),
	schema = mongoose.Schema,
	bcrypt = require("bcryptjs");

const bills = new schema ({

});

const billDetails = mongoose.model("billDetails", bills);

module.exports = {
	billDetails
};