const https = require('https');
const fs = require('fs');

const options = {
  hostname: "www.w3schools.com",
  port: 443,
  path: "/js/default.asp",
  method: "GET"
};

const request = https.request(options, (res) => {
  let responseBody = "";
  res.setEncoding("UTF-8");
  res.on("data", chunk => {
    console.log("---chunk", chunk.length);
    responseBody += chunk;
  });
  res.on("end", () => {
    fs.writeFile("js.html", responseBody, err => {
      if (err) {
        throw err;
      }
      console.log("donwloaded")
    })
  })
});

request.end();