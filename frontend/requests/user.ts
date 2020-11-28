import { token } from './TOKEN';

export const getSelf = () => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/user', {
    method: 'GET',
    headers: {
      token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const getUser = (handle: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/user/${handle}`,
    {
      method: 'GET',
      headers: {
        token,
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
export const getHandle = () => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/handle',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        token,
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const getUserProfile = (handle: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/user/profile/${handle}`,
    {
      method: 'GET',
      headers: {
        token,
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const getFollowers = (handle: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/${handle}/follower`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
export const getFollowing = (handle: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/${handle}/following`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
