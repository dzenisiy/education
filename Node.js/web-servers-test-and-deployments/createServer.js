const {createServer} = require('http');

createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(`
  <!DOCTYPE html>
  <html>
    <body>
        <h1>Seving HTML</h1>
        <p>${req.method} request made for ${req.url}</p>
    </body>
  </html>
  `);
}).listen(3000);

console.log("web server is listening on port 3000")