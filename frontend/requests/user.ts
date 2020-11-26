export const getSelf = () => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/user', {
    method: 'GET',
    headers: {
      token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYzMTc0ODcsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjMxNzQ4NywiZXhwIjoxNjA2MzIxMDg3LCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mv-2U28Azy36p6cZteYQWxXERp4Zqa0pQ7cTvVW2lsCqZsVr4v4W3I6WNx_QSfDKG-IX_dFsg9RwsmhvsR8gR0n1M0Grwf6ALrXEhp-xGL0bI1p3ndTzxYd2B1xEp9w5ohywomgoq2ILQZJQAtXLe4CktcikRO6zia-Fv9w0GHmX6C1VMNuaITfEh6eVKnsPwirbCOz29Ku3cBeNRzDudiE47YT5cmW3pZf1JFbBe84DoXnsdGuS4nQUlX_0Ve1ZgSqGVKkzuGYbV-b2UsogK4tPLK9UmzYQ62uns5376grsgz96nbuYjZZMk6842JQcsYFuX8M9LTDm_vS8wuvhIQ',
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
        token:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYzMTc0ODcsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjMxNzQ4NywiZXhwIjoxNjA2MzIxMDg3LCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mv-2U28Azy36p6cZteYQWxXERp4Zqa0pQ7cTvVW2lsCqZsVr4v4W3I6WNx_QSfDKG-IX_dFsg9RwsmhvsR8gR0n1M0Grwf6ALrXEhp-xGL0bI1p3ndTzxYd2B1xEp9w5ohywomgoq2ILQZJQAtXLe4CktcikRO6zia-Fv9w0GHmX6C1VMNuaITfEh6eVKnsPwirbCOz29Ku3cBeNRzDudiE47YT5cmW3pZf1JFbBe84DoXnsdGuS4nQUlX_0Ve1ZgSqGVKkzuGYbV-b2UsogK4tPLK9UmzYQ62uns5376grsgz96nbuYjZZMk6842JQcsYFuX8M9LTDm_vS8wuvhIQ',
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
        token:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYzMTc0ODcsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjMxNzQ4NywiZXhwIjoxNjA2MzIxMDg3LCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mv-2U28Azy36p6cZteYQWxXERp4Zqa0pQ7cTvVW2lsCqZsVr4v4W3I6WNx_QSfDKG-IX_dFsg9RwsmhvsR8gR0n1M0Grwf6ALrXEhp-xGL0bI1p3ndTzxYd2B1xEp9w5ohywomgoq2ILQZJQAtXLe4CktcikRO6zia-Fv9w0GHmX6C1VMNuaITfEh6eVKnsPwirbCOz29Ku3cBeNRzDudiE47YT5cmW3pZf1JFbBe84DoXnsdGuS4nQUlX_0Ve1ZgSqGVKkzuGYbV-b2UsogK4tPLK9UmzYQ62uns5376grsgz96nbuYjZZMk6842JQcsYFuX8M9LTDm_vS8wuvhIQ',
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
