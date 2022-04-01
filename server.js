const http = require('http'),
    fs = require('fs'),
    url = require('url');

http.createServer((request, response) => {

    //define the 3 parameter to parse the address
    let addr = request.url,
        q = url.parse(addr, true),
        filepath = '';
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added to log.');
        }
      });

    //Check if the url has the documentation word in it, otherwise direct to index.html
    if (q.pathname.includes('documentation')) {
        filepath = (__dirname + '/documentation.html');
    } else {
        filepath = 'index.html'
    }

    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.log(err)
            throw err;
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });

}).listen(8080);

console.log('-- Server started on port 8080 --');