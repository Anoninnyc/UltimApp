var express = require('express');
var app = express();


const pathToStaticDir = path.resolve(__dirname, '.', '/public');
app.use(express.static(__dirname + '/public'));


app.get('*', (req, res)=> {
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});