export const fetchUser = () => {
  return fetch('https://asia-east2-project-4d358.cloudfunctions.net/api/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYyMjE1ODIsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjIyMTU4MiwiZXhwIjoxNjA2MjI1MTgyLCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.j-A9iHCKk5zRpkM2c0e9CnuiI7UWEhlFchi-jAar37MqCRsOe22iIugwclvu6vvcZOrKdmgmakhT3o1BfFUPVQha6dkDv2rZMuRD3wrhgSaZv-0FnTe4rp-mXv5KUFa0UFDbfkYgGYk1d0CvBm_alWtzk0X-_59ZXsd8Z0p-yb35EzyeiNhquG1R6g-KfOsBkp5aXl9R-FmFShdrhsowrYfRM7AH1tYvt-LvBSo5bHjeRIE4ltaSuuFw5MB-XbCKBnxAQvkzpatlV0s--BMmJVlo7u7Q-gGg-kYnPzdQDfRw4H0zCKIePhn2B7fCqovWN6iFyCe-rHTQ-r-oemv0-A',
    },
  })
    .then((res) => res.json())
    .then((res) => res.user)
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
