# symmetrical-giggle
### BRIVO API WRAPPER
This is a wrapper for the Brivo API. It is written in Python 3.6.

### Current Functionality
Can authenticate, get users, get user groups based on a user id, get groups, assign users to groups, create users, delete users, and update users. 

### Installation
To install, clone the repository and run `pip install .` from the root directory.

### Usage
To use the wrapper, import the Brivo class from the apiwrapper module. Instantiate the class with your Brivo username and password. Then, call the desired method. For example:

```
require('dotenv').config({ path: './.env.local' });

const BrivoAPI = require('./apiwrapper');

const brivo = new BrivoAPI(
  'https://auth.brivo.com',
  process.env.SECRET_BRIVO_API_KEY,
  process.env.SECRET_BRIVO_CLIENT_ID,
  process.env.SECRET_BRIVO_CLIENT_SECRET
);

brivo.authenticate(process.env.SECRET_BRIVO_USERNAME, process.env.SECRET_BRIVO_PASSWORD).then(response => {
  console.log("Logged in successfully");
  return brivo.getUsers();
}).then(users => {
  console.log(users);
}).catch(err => {
  console.error(err);
});

```

### Methods
The following methods are currently implemented:

* authenticate(username, password)
* getUsers()
* getUserGroups(userID)
* getGroups()
* assignUserToGroup(userID, groupID)
* createUser(firstName, lastName, email, phone, password, groups)
* deleteUser(userID)
* assignCredentialsAndDates(userID, credentialID, startDate, endDate)
* updateUser(userID, firstName, lastName, email, phone, password, groups)


