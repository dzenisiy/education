const {createServer} = require('http');
const data = require('./cats.json');

createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/json'});
  if (req.url.toLowerCase() === '/biscuit') {
    let biscuit = data.filter(
        (cat) => cat.name === 'Biscuit',
    );
    res.end(JSON.stringify(biscuit));
  } else if (req.url.toLowerCase() === '/jungle') {
    let biscuit = data.filter(
        (cat) => cat.name === 'Jungle',
    );
    res.end(JSON.stringify(biscuit));
  } else {
    res.end(JSON.stringify(data));
  }
}).listen(3000);