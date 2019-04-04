export default class UserAdpter {
  
  static getUsers() {
    return fetch('http://localhost:3000/api/v1/users')
      .then(res => res.json())
  }
}
