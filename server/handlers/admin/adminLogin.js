const adminLogin = require("../../models/adminDetails"),
	bcrypt = require('bcryptjs'),
	newToken = require('../createToken');

module.exports = (req, res)=>{
	let uname = req.body.username;

	adminLogin.adminDetails.findOne({
		aUname: uname
	},'aPwd', function(err, user){
		const adminJSON = JSON.parse(JSON.stringify(user));
		console.log(adminJSON);
		if(err) return err;
		if(!user) {
			return res.json({ message: " he is not admin" });
		} else if(user) {
			const validatePassword = user.comparePassword(req.body.password);
			if(!validatePassword) {
				console.log("enter correct password");
				res.json({ message: "enter correct password" });
			} else {
				const token = newToken.createToken(adminJSON);
				res.json({
					success: true,
					message: "Admin logged in",
					token: token
				});
			}
		}
	});
};