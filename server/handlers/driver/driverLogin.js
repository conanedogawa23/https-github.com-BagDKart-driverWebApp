const driverLogin = require('../../models/driverDetails'),
	bcrypt = require('bcryptjs'),
	newToken = require('../createToken');

module.exports = (req, res)=>{
	let uname = req.body.username,
		pwd = req.body.password,
		err = req.validationErrors();

	req.checkBody('username', 'Username must not be empty').notEmpty();
	req.checkBody('password', 'password must not be empty').notEmpty();

	if(err) {
		res.status(400).send({ "message": "Missing parameter" });
		return;
	}else {
		driverLogin.driverDetails.findOne({
			dUname: uname
		},'dPwd', function(err, user){
			const driverJSON = JSON.parse(JSON.stringify(user));
			console.log(driverJSON);
			if(err) return err;
			if(!user) {
				return res.json({ message: " he is not driver" });
			} else if(user) {
				const validatePassword = user.comparePassword(pwd);
				if(!validatePassword) {
					console.log("enter correct password");
					res.json({ message: "enter correct password" });
				} else {
					const token = newToken.createToken(driverJSON);
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