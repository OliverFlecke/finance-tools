/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());

const port = process.env.PORT || 80;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token/';

app.post('/authorize', (req, res) => {
	console.log('Authorize end point called');
	const code = req.query.code;

	fetch(GITHUB_AUTH_ACCESSTOKEN_URL, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			client_id,
			client_secret,
			code,
		}),
	})
		.then(async (response) => {
			const json = await response.json();
			if ('error' in json) {
				res.status(400).send(json);
				console.log('Failed: ' + JSON.stringify(json));
			} else {
				res.send(json);
				console.log('Success');
			}
		})
		.catch(function (error) {
			console.error('Error ' + error.message);
			res.status(400).send(error.message);
		});
});

app.get('/', function (req, res) {
	console.log('Health check OK');
	res.send('OK');
});

app.listen(port, function () {
	console.log('Authorization proxy is running');
});
