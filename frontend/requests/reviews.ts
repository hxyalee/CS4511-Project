export const getReviews = () => {
  return fetch('http://localhost:5000/project-4d358/asia-east2/api/getReviews', {
      method: 'POST',
  })
    .then((res) => res.json())
};