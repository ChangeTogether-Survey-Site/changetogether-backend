let usr;
let pwd

try {
  // local file with credentials
  let json = require('./secrets.json');
  usr = json['user']; 
  pwd = json['password'];
  console.log('local environment');
}
catch (err) {
  // environment variables cloud
  usr = process.env.USER;
  pwd = process.env.PASSWORD;
  console.log('prod environment');
}


module.exports = {
  //local MongoDB deployment ->
  // URI: "mongodb://127.0.0.1/faculty_info",
  URI: `mongodb+srv://${usr}:${pwd}@cluster0.base8bc.mongodb.net/survey?retryWrites=true&w=majority`
};