const express = require("express"),
	app = express(),
	cfenv = require("cfenv"),
	appEnv = cfenv.getAppEnv();

app.get("*", (req, res)=> {
	res.sendFile(__dirname+"/index.html");
});

app.listen(appEnv.port, appEnv.bind, (err)=>{
	console.log(`Server is at ${appEnv.url}`);
});