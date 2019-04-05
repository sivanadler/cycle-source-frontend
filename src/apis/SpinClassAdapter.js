export default class SpinClassAdapter {

  static getSpinClasses() {
    return fetch('http://localhost:3000/api/v1/spin_classes')
      .then(res => res.json())
  }
}
