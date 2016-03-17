var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');

var user = {
	username: 'corey1',
	password: 'password'
};


var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/random-user', function(req, res){
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.post('/login', authenticate, function(req, res){
	console.log("======================");
	console.log(req.body);
	res.send(user);
});

app.listen(3000, function(){
	console.log('App is listening on localhost:3000');
});

// UTILITY FUCTIONS
function authenticate(req, res, next){
	var body = req.body;
	if (!body.username || !body.password){
		res.status(400).end('Must provide username or password');
	}
	if (body.username !== user.username || body.password !==user.password){
		res.status(401).end('Username or password does not exist')
	}

	next();
};