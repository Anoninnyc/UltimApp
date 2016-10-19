var path = require('path');
var models= require('./models.js')


const pathToStaticDir = path.resolve(__dirname, '.', '/public');

const login = (req,res)=> {
  console.log("Trying to login");
}

const wildcard = (req,res)=>{
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
}

const listen = (req,res)=>{
  console.log("listening on port 3000")
}

module.exports= {
	login,
	wildcard,
	listen,
};