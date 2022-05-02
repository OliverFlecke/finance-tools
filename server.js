/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('https');
const fs = require('fs');
const next = require('next');

const port = parseInt(process.env.PORT, 3000) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, port });
const handle = app.getRequestHandler();

console.log(`Port is: ${port}`);
const options = {
	key: fs.readFileSync('localhost.key'),
	cert: fs.readFileSync('localhost.crt'),
};

app.prepare().then(() => {
	https
		.createServer(options, async (req, res) => {
			await handle(req, res);
		})
		.listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on localhost:${port}`);
		});
});
