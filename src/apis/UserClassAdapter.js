export default class UserClass {

  static getUserClasses(){
    return fetch('http://localhost:3000/api/v1/user_classes')
    .then(res => res.json())
  }

  static createUserClass(spinClass, id, selectedBike) {
    let data = {
      user_id: id,
      spin_class_id: spinClass.class_id,
      bike: selectedBike
    }
    return fetch('http://localhost:3000/api/v1/user_classes',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }
}
