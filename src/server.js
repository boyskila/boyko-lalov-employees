const http = require('http')
const qs = require('querystring')
const fs = require('fs')
const fileParser = require('./ContentParser')
const findPairWorkedTogetherForTheMostTime = require('./bestMatchesFinder')
const PORT = 3000

const requestHandler = (request, response) => {

    if (request.method == "POST") {
        let body = '';
        response.setHeader('Access-Control-Allow-Origin', '*')
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body += chunk.toString()
        }).on('end', () => {
            try {
                const employees = fileParser(Object.keys(qs.parse(body))[0]);
                const result = findPairWorkedTogetherForTheMostTime(employees)

                response.write(JSON.stringify(result))
                response.end()
            } catch (error) {
                response.statusCode = 500
                response.end(error.message)
            }
        });
    } else {
        response.end(fs.readFileSync(__dirname + request.url));
    }
}

const server = http.createServer(requestHandler)

server.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${PORT}`)
})
