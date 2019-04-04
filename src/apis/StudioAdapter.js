export default class StudioAdapter {

  static getStudios() {
    return fetch('http://localhost:3000/api/v1/studios')
      .then(res => res.json())
  }
}
