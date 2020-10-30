const { writeFileSync } = require('fs')
const https = require('https')

const parser = require('./parser')

function crawl([year]) {
  if (!year) {
    year = new Date().getFullYear().toString()
  }

  const req = https.request(
    {
      host: 'publicholidays.co.id',
      path: `/id/${year}-dates/`
    }
  , (response) => {
    if (response.statusCode > 299) {
      console.error(`request error: ${response.statusMessage}`)
      process.exit(-1)
    }
    let htm = ''
    
    response.on('data', function (chunk) {
      htm += chunk;
    });
  
    response.on('end', function () {
      const data = parser(htm, year)
      writeFileSync(`rsc/${year}.json`, JSON.stringify(data, null, 2))
    });
  })
  
  req.on('error', error => {
    console.error('request error', error)
    process.exit(-1)
  })

  req.end()
}

crawl(process.argv.slice(2))