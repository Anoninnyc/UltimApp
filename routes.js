var path = require('path');
var models= require('./models.js')


const pathToStaticDir = __dirname+'/client/public/index.html'
// path.resolve(__dirname, '.', 'client/public');
const login = (req,res)=> {
  console.log("Trying to login",req.body);
}

const signup = (req,res)=> {
  console.log("Trying to signup",req.body);
}

const wildcard = (req,res)=>{
  res.status(200).sendFile(pathToStaticDir);
  
}

const listen = (req,res)=>{
  console.log("listening on port 3000")
}

module.exports= {
	login,
	wildcard,
	listen,
	signup,

};