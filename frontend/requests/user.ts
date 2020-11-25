export const fetchUser = () => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/user', {
    method: 'GET',
    headers: {
      token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYyOTY3MDYsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjI5NjcwNiwiZXhwIjoxNjA2MzAwMzA2LCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PfgRT35or4iHEbv5aWrygaIZOByAF3tkL4VYoYttWt4E7ORm9Wn5BMnJRSapjg6SNhYx5U2wKWttpLcybh9zWRueYSw91vqawiG0_kOvoLJEMeeFoJa5rOeB9s7vYCKD3LRo_DmWDVEku8pu9PAHUcBUtsMG7Ddj591aiElELV2RvbOuVdXcKgSrhY5b5GYW5dLJ0yfMg6rkoii5Qswaco8rkvFP5WgMCyjlOsZ3jrKMYB8Gn8orkSHo0-mBDrolclVjLwyV6XGLYF2WrwADcMaJJe4bDCN38vh8u_-0uX9EeWPKSR7BN_Y9hjzSo0r5O5_EM5nHOgKX0H4u_FCpfQ',
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
/**
 * 
 * 
 * 
 * Object {
  "blocked": Array [],
  "createdAt": "2020-11-23T12:07:31.621Z",
  "description": "",
  "email": "hoya@gmail.com",
  "followers": Array [],
  "following": Array [
    "weeb king",
  ],
  "handle": "test",
  "imageURL": "https://firebasestorage.googleapis.com/v0/b/project-4d358.appspot.com/o/no-image.png?alt=media",
  "name": "hoya",
  "password": "asdasd",
  "reviews": Array [],
  "saved": Array [
    "WQO3K1ZvF2Junn6HnXoF",
    "WQO3K1ZvF2Junn6HnXoF
",
  ],
  "userId": "eHXC41AnlCUMUVODuAZTKNLAYmx2",
}

 */
