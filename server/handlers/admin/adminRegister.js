const adminRegister = require("../../models/adminDetails");
	
module.exports = (req, res)=>{
	const adminUserRegister = new adminRegister.adminDetails(),
		err = req.validationErrors();
	
	let uname = req.body.username,
		pwd = req.body.password,
		email = req.body.email,
		fname = req.body.fname,
		lname = req.body.lname;

	req.checkBody('username', 'Username is required').isEmail().notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('email', 'email must be secondary').notEmpty();
	req.checkBody('fname', 'fname is required').notEmpty();
	req.checkBody('lname', 'lname is required').notEmpty();

	if(err) {
		res.status(400).send({ "message": "Missing parameter" });
		return;
	} else {
		adminUserRegister.aUname = uname;
		adminUserRegister.aPwd = pwd;
		adminUserRegister.aEmail = email;
		adminUserRegister.aFname = fname;
		adminUserRegister.aLname = lname;
		res.json(adminUserRegister);
	}
};