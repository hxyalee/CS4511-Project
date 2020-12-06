export const getSelf = (token: string) => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/user', {
    method: 'GET',
    headers: {
      token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const getUser = (token: string, handle: string) => {
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
export const uploadPhoto = (token: string, image: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/userPhoto`,
    {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
export const getHandle = (token: string) => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/handle',
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

export const getUserProfile = (token: string, handle: string) => {
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

export const follow = (token: string, handle: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/follow`,
    {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handle }),
    }
  ).then((res) => res.json());
};
export const unfollow = (token: string, handle: string) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/unfollow`,
    {
      method: 'POST',
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handle }),
    }
  ).then((res) => res.json());
};
