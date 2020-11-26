const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYzOTU5NzgsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjM5NTk3OCwiZXhwIjoxNjA2Mzk5NTc4LCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.dUoQDhnJ1zYPiss-Rdjfgjx-YoN988iE1Va601gWYgZP2DCP34g5aJDXO5jcQAfMkBa1D7n7kRWiUGvq40Y4nlRVsN7cofLZa6ACNPSlsl3RhvxcRMCaG46WiC6ohWVOdpcQRf1mZKOuUEiml2RNSuBnqgMJxez5Ud9a8fdu1fPHJmNsz3VCLOmvRIeV0APDdnwjk7llOSbkY9HHNLilsFJ2cBuolgxpPfcaqju4Z6qQsrBSnIq6VhVwxv9pbWeLPf3u8I9reymBMvntpXjcx0HEtcxcN65rqwJUU5z8H4wdz86eE1Dndvqxdcd5FV0UlZcEx5HW1txhSMjJnFVjHg';
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
