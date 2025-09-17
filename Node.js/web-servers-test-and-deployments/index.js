const https = require('https');
const fs = require('fs');

const url = "https://www.w3schools.com/js/default.asp"

const request = https.get(url, (res) => {
  let download = fs.createWriteStream("js.html");
  console.log("response started");
  res.pipe(download);
  res.on("end", () => {
    console.log("Response Finished");
  })
});

request.end();