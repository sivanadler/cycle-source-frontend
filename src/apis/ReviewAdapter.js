export default class ReviewAdapter {

  static getReviews() {
    return fetch('http://localhost:3000/api/v1/reviews')
      .then(res => res.json())
  }

  static createReview(rating, review, review_title, studio_id, user_id) {
    let data = {
      rating: rating,
      review_text: review,
      review_title: review_title,
      studio_id: studio_id,
      user_id: user_id
    }
    return fetch('http://localhost:3000/api/v1/reviews',{
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
