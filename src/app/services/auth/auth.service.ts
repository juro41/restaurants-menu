import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  /**
   * Returns true if user with userName and password exist, false if not
   * 
   * @param {string} userName 
   * @param {string} password 
   * @returns User exist
   * @memberof AuthService
   */
  login(userName: string, password: string) {
    return $.getJSON('../assets/data.json', (json) => {
      return json;
    }).then((res, rej) => {
      const users = res.users;
      let isFound = false;
      users.filter((user) => {
        if (user.userName == userName && user.password == password) {
          isFound = true;
          localStorage.setItem('activeUser', JSON.stringify(user));
        }
      });
      return isFound;
    });
  }

  /**
   * Log out user
   * 
   * @memberof AuthService
   */
  logout() {
    localStorage.removeItem('activeUser');
  }

  /**
   * Returns true if value with key activeUser exist if not
   * returns false.
   * 
   * @returns {boolean} Login status
   * @memberof AuthService
   */
  isActive(): boolean {
    if (localStorage.getItem('activeUser') != undefined) {
      return true;
    }
    return false;
  }

}
