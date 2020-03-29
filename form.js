var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);
            fs.writeFileSync('message.txt', body);
            res.end('ok');
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form method="POST" action="/message">
                <h5>PLEASE ENTER A MESSAGE BELOW</h5>
                <label class="msg" for="message">Message: </label><br>
                <input name="message" type="text"><br>
                <button type="submit" name="submit-button">Submit</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(8080);
