import { getSelf } from "./user";

export const getReviews = (token: string) => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/getReviews',
    {
      method: 'POST',
      headers: {
        token,
      },
    }
  ).then((res) => res.json());
};

export const getReviewById = (token: string, reviewId: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/review/${reviewId}`,
    {
      method: 'POST',
      headers: {
        token,
      },
    }
  ).then((res) => res.json());
};

export const getFeed = (token: string) => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/feed',
    {
      method: 'POST',
      headers: {
        token,
      },
    }
  ).then((res) => res.json());
};

export const getSaved = (token: string) => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/reviews/saved',
    {
      method: 'POST',
      headers: {
        token,
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const addReview = (token: string, payload: any) => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/createReview',
    {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());
};

export const likeReview = (token: string, reviewId: string) => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/like', {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({postId: reviewId}),
    }).then((res) => res.json());
};

export const unlikeReview = (token: string, reviewId: string) => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/unlike', {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({postId: reviewId}),
    }).then((res) => res.json());
};

export const saveReview = (token: string, reviewId: string) => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/save', {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({reviewId: reviewId}),
    }).then((res) => res.json())
    .catch((error) => console.log("Failed to save: ", error));
};

export const unsaveReview = (token: string, reviewId: string) => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/unsave', {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({reviewId: reviewId}),
    }).then((res) => res.json())
    .catch((error) => console.log("Failed to unsave: ", error));
};
