export default class InstructorAdapter {

  static getInstructors() {
    return fetch('http://localhost:3000/api/v1/instructors')
      .then(res => res.json())
  }
}
