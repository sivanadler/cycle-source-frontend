export default class FavoriteAdapter {

  static getFavorites() {
    return fetch('http://localhost:3000/api/v1/favorites')
      .then(res => res.json())
  }

  static createFavorite(studio_id, user_id) {
    let data = {
      studio_id: studio_id,
      user_id: user_id
    }
    return fetch('http://localhost:3000/api/v1/favorites',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }

  static destroyFavorite(favorite) {
     return fetch(`http://localhost:3000/api/v1/favorites/${favorite.id}`,{
      method: "DELETE"})
  }
}
