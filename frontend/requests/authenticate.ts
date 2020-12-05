/* For signing up new users and logging in */

export const registerUser = (payload: any) => {
    return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( payload ),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };

export const logUser = (payload: any) => {
return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/login', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify( payload ),
})
    .then((res) => res.json())
    .catch((e) => console.log(e));
};