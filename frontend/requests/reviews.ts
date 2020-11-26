export const getReviews = () => {
  return fetch(
    'https://asia-east2-project-4d358.cloudfunctions.net/api/getReviews',
    {
      method: 'POST',
      headers: {
        token:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC00ZDM1OCIsImF1ZCI6InByb2plY3QtNGQzNTgiLCJhdXRoX3RpbWUiOjE2MDYzOTIyMjAsInVzZXJfaWQiOiJlSFhDNDFBbmxDVU1VVk9EdUFaVEtOTEFZbXgyIiwic3ViIjoiZUhYQzQxQW5sQ1VNVVZPRHVBWlRLTkxBWW14MiIsImlhdCI6MTYwNjM5MjIyMCwiZXhwIjoxNjA2Mzk1ODIwLCJlbWFpbCI6ImhveWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhveWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.kQeW61f6HgRHEe0xsKzfEZLXj2U_C39AQhxx8447YmPj71ZS8387nS3Hud5QJXd25Jcjh6e43Avg_6x8bIZshuoUywyxAkIqq6KC1dzn1YxnEGwnrXCBM9Ng7rSoqEcZQvJlWSUF4Rg5UemFOpoNvqke8Gp1LSbv_nyK5cExqDQ-cRA3n0BCcEGOEQ9ouSd7yLsyZvtNy0KrJef1XlBvKnZ4Vw4Iu0FnEi5-zybOsRMlqh247RN-3IHnVB4f5lXFf5f2zrqM7mOWCEhzUDgA8hbxqg7boYjlvJF5Zc7R0tJn1PsDVyDhOYvBw1bk9EhJ9f7zPsqmwRxkSNgLN6ud3A',
      },
    }
  ).then((res) => res.json());
};
