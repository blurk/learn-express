import http from 'node:http'
import fs from 'node:fs/promises'

const PORT = 3000


const server = http.createServer()

server.on('request', async (req, res) => {

	if (req.method === 'GET') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});

		try {
			const fileName = req.url === '/' ? '/index' : req.url
			const data = await fs.readFile(__dirname + fileName + '.html', { encoding: 'utf8' })
			res.write(data)
		} catch (error) {
			const data = await fs.readFile(__dirname + '/404.html', { encoding: 'utf8' })
			res.write(data)
		}

		res.end()
	}
}).listen(PORT)