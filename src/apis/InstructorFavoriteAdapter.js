export default class InstructorFavoriteAdapter {

  static getInstructorFavorites() {
    return fetch('http://localhost:3000/api/v1/instructor_favorites')
      .then(res => res.json())
  }

  static createInstructorFavorite(instructor_id, user_id) {
    let data = {
      instructor_id: instructor_id,
      user_id: user_id
    }
    console.log(data)
    return fetch('http://localhost:3000/api/v1/instructor_favorites',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }

  static destroyInstructorFavorite(favorite) {
     return fetch(`http://localhost:3000/api/v1/instructor_favorites/${favorite.id}`,{
      method: "DELETE"})
  }
}
