const sessionSpecs= {
  cookieName: 'mySession', // cookie name dictates the key name added to the request object
  secret: "This will be changed in prod", // should be a large unguessable string
  resave: true,
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  saveInitialized: true
};


const oneDay = 86400000;

module.exports={
	oneDay,
	sessionSpecs,
}