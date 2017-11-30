const mongoose = require("mongoose"),
	schema = mongoose.Schema,
	bcrypt = require("bcryptjs");

const driver = new schema ({
	dUname: {
		type: String,
		index: {
			unique: true
		},
		required: true,
	},
	dPwd: {
		type: String,
		index: {
			unique: true
		},
		required: true
	},
	dEmail: {
		type: String,
		index: {
			unique: true
		},
		required: true
	},
	dFname: {
		type: String,
	},
	dLname: {
		type: String,
	}
},{
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

driver.pre('save', function(next){
	let driverInfo = this;
	bcrypt.hash(driverInfo.password, 10).then((hash) => {
        driverInfo.password = hash; //if there is no error we are going to hash
        console.log("authenticate as driver");
        next();
    }).catch((err) => {
    	console.log("password not hashed :"+err);
    });
});

driver.methods.comparePassword = function(pwd){
	let dInfo = this;
	return bcrypt.compareSync(pwd, dInfo.password);
};

const driverDetails = mongoose.model("driverDetails", driver);

module.exports = {
	driverDetails
};