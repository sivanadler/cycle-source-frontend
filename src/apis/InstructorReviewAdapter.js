export default class InstructorReviewAdapter {

  static getInstructorReviews() {
    return fetch('http://localhost:3000/api/v1/instructor_reviews')
      .then(res => res.json())
  }

  static createInstructorReview(rating, review, review_title, instructor_id, user_id) {
    let data = {
      rating: rating,
      review_text: review,
      review_title: review_title,
      instructor_id: instructor_id,
      user_id: user_id
    }
    return fetch('http://localhost:3000/api/v1/instructor_reviews',{
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
