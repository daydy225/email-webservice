const http = require('http');
const app = require('./app.js');
const { port } = require('./config/config.js');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
