const adminLogin = require("../../models/adminDetails"),
	bcrypt = require('bcryptjs'),
	newToken = require('../createToken');

module.exports = (req, res, next)=>{
	let uname = req.body.username,
		pwd = req.body.password,
		err = req.validationErrors();
	req.checkBody('username', 'Username is required').isEmail().notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	if(err){
		res.status(400).send({ "message": "Missing parameter" });
		return;
	} else {
		adminLogin.adminDetails.findOne({
			aUname: uname
		},'aPwd', function(err, user){
			const adminJSON = JSON.parse(JSON.stringify(user));
			console.log(adminJSON);
			if(err) return err;
			if(!user) {
				return res.json({ message: " he is not admin" });
			} else if(user) {
				const validatePassword = user.comparePassword(pwd);
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
	}
	
};