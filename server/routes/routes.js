const jwt = require("jsonwebtoken"),
	config = require("../../config"),
	secretKey = config.secretKey,
	driverLogin = require("../handlers/driver/driverLogin"),
	driverRegister = require("../handlers/driver/driverRegister"),
	adminRegister = require("../handlers/admin/adminRegister"),
	adminLogin = require("../handlers/admin/adminLogin"),
	cors = require('cors'),
	expressValidator = require('express-validator');

module.exports = (app, express)=> {
const api = express.Router();
api.use(expressValidator());
api.use(cors());

api.get("/",(req, res, next)=> {
	if(res.headersSent){
		res.json(`test unsuccessful`);
		console.log("sent headers");
	} else {
		res.json(`test successful`);
		console.log("didnt sent headers");
	}
});

api.post('/test', (req, res)=> {
	let test = req.body.test;
	res.json(test);
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

api.post("/trial",(req, res, next)=>{
	res.json(req.decoded);
});

return api;
}