const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYzOTk3NDYsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjM5OTc0NiwiZXhwIjoxNjA2NDAzMzQ2LCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.by99ZfgucTZnnSIe-ad9bsn0OdymJugUX_VcW1pIl48plBwmc95BEDUEYXv1ENr4247zZLEYQygvVuXyWo6xvcaJouZCgQEc8EmXZlQAoIs3EUXf6Yy5DG3MRRvjN8aQAnqHLFJ6f9PMpVRGVLtqWLjeXEqZzic38s-i9t0AvoKblUEvfEArA_e_SClQ0ClWvmr6XUhsQccwYEq6gY8oiBI-ordgu6nD6Pray5g3XzWbGzlKeXk-w9SwTWJLFz4ewxyoACKrdv9GshYWdd9ou4DZCnVgWy1AEMmPi7GE8V9KIKY2vEp3ZjKafpP1Gyt8VWmaIuDgujEdV694Yc4nfA';
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
