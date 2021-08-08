const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 80;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token';

app.post('/authorize', function (req, res) {
	const code = req.query.code;

	axios({
		method: 'post',
		url: GITHUB_AUTH_ACCESSTOKEN_URL,
		headers: {
			Accept: 'application/json',
		},
		data: {
			client_id,
			client_secret,
			code,
		},
	})
		.then(function (response) {
			res.send(response.data);
			console.log('Success ' + response);
		})
		.catch(function (error) {
			console.error('Error ' + error.message);
		});
});

app.get('/', function (req, res) {
	res.send('OK');
});

app.listen(port, function () {
	console.log('Authorization server running');
});
