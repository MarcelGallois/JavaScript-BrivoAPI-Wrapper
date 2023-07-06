// Very simple js file to test querying the API

require('dotenv').config({ path: './.env.local' });

const BrivoAPI = require('./apiwrapper');

const brivo = new BrivoAPI(
  'https://auth.brivo.com',
  process.env.SECRET_BRIVO_API_KEY,
  process.env.SECRET_BRIVO_CLIENT_ID,
  process.env.SECRET_BRIVO_CLIENT_SECRET
);


let firstName = "John";
let lastName = "Doe";
let email = "";
let phone = "";
let password = "";
let groups = [];


brivo.authenticate(process.env.SECRET_BRIVO_USERNAME, process.env.SECRET_BRIVO_PASSWORD).then(response => {
  console.log("Logged in successfully");
  return brivo.getGroups();
}).then(groups => {
  console.log(groups);
}).catch(err => {
  console.error(err);
});
