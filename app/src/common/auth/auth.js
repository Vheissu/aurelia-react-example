import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Auth {
    constructor(http) {
        this.http = http;
    }

    isAuthenticated() {
        let access_token = window.localStorage.getItem('access_token');

        if (access_token == null) {
            return false;
        } else {
          return this.verifyToken(access_token);
        }
    }

    login(identity, password) {

    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('client_token');
    }

    makeRequest(type, data = {}) {
        var url = '';

        switch(type) {
            case 'verifyToken':
                url = 'http://localhost/api/session/verifyToken';
            case 'requestToken':
                url = 'http://localhost/api/session/requestToken';
        }

        return this.http.fetch(url, {
            method: 'POST',
            body: data
        });
    }

    requestToken(identity, password) {
        return this.makeRequest('requestToken', {identity: identity, password: password})
          .then(response => response.json())
          .then(data => {
              if (data) {
                  window.localStorage.setItem('access_token', data.access_token);

                  return true;
              } else {
                  return false;
              }
          })
          .catch(err => {
              throw new Error(err);
          });
    }

    verifyToken(token) {
        return this.makeRequest('verifyToken', {access_token: token})
          .then(response => response.text())
          .then(data => {
              if (data) {
                  return true;
              } else {
                  return false;
              }
          })
          .catch(err => {
              throw new Error(err);
              return false;
          });
    }

}
