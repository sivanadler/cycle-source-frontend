export default class LocationAdapter {

  static getLocations() {
    return fetch('http://localhost:3000/api/v1/locations')
      .then(res => res.json())
  }
}
