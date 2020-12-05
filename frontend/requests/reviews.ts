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
