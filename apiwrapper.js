const axios = require('axios');
const qs = require('qs');



class BrivoAPI {
  constructor(baseURL, apiKey, clientId, clientSecret) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.clientSignature = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    this.token = null;
  }

  async authenticate(username, password) {
    try {
      const response = await axios.post(`${this.baseURL}/oauth/token`, qs.stringify({
        grant_type: 'password',
        username: username,
        password: password
      }), {
        headers: {
          'Authorization': `Basic ${this.clientSignature}`,
          'api-key': this.apiKey,
          'Content-type': 'application/x-www-form-urlencoded'
        }
      });
      this.token = response.data.access_token;
      return response.data;
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  }


  async getUsers() {
    try {
      const response = await axios.get(`https://api.brivo.com/v1/api/users`, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get users: ", error);
    }
  }

  async getGroups() {
    try {
      const response = await axios.get(`https://api.brivo.com/v1/api/groups`, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get groups: ", error);
    }
  }

  async getUserGroups(userID) {
    try {
      const response = await axios.get(`https://api.brivo.com/v1/api/${userID}/groups`, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get user groups: ", error);
    }
  }

  async createUser(firstName, lastName, email, phone, password, groups) {
    try {
      const response = await axios.post(`https://api.brivo.com/v1/api/users`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        groups: groups
      }, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create user: ", error);
    }
  }

  async deleteUser(userID) {
    try {
      const response = await axios.delete(`https://api.brivo.com/v1/api/users/${userID}`, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete user: ", error);
    }
  }

  async assignCredentialsAndDates(userID, credentialID, startDate, endDate) {
    try {
      const response = await axios.post(`https://api.brivo.com/v1/api/users/${userID}/credentials/${credentialID}`, {
        userId: userID,
        credentialId: credentialID,
        startDate: startDate,
        endDate: endDate
      }, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to assign credentials and dates: ", error);
    }
  }

  async updateUser(userID, firstName, lastName, email, phone, password, groups) {
    try {
      const response = await axios.put(`https://api.brivo.com/v1/api/users/${userID}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        groups: groups
      }, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  }

  async assignUserToGroup(userID, groupID) {
    try {
      const response = await axios.post(`https://api.brivo.com/v1/api/groups/${groupID}/users/${userID}`, {
        headers: {
          'Authorization': `bearer ${this.token}`,
          'api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to assign user to group: ", error);
    }
  }


  // other API methods as required...
}

module.exports = BrivoAPI;
