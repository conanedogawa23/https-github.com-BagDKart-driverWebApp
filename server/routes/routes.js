const jwt = require("jsonwebtoken"),
	config = require("../../config"),
	secretKey = config.secretKey,
	driverLogin = require("../handlers/driver/driverLogin"),
	driverRegister = require("../handlers/driver/driverRegister"),
	adminRegister = require("../handlers/admin/adminRegister"),
	adminLogin = require("../handlers/admin/adminLogin"),
	expressValidator = require('express-validator');

module.exports = (app, express)=> {
const api = express.Router();
api.use(expressValidator());

api.get("/",(req, res)=> {
	res.json(`test successful`);
});

api.post('/adminLogin', adminLogin);

api.post('/adminRegister', adminRegister);

api.post('/driverLogin', driverLogin);

api.post('/driverRegister', driverRegister);

api.use((req, res, next)=> {
	const token = req.body.token;
	if(token) {
		jwt.verify(token, secretKey, function(err, decoded){
			if(err) {
				res.status(403).send({ success: false, message: "failed to authenticate"});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(403).send({ success: false, message: "no token generated"});
	}
});

api.post("/trial",(req, res)=>{
	res.json(req.decoded);
});

return api;
}