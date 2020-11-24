import axios from 'axios';
import APIKey from '../constants/ApiKey';
export const handleRestaurantSearchRequest = (options: any) => {
  return fetch(
    `https://developers.zomato.com/api/v2.1/search?q=${options.query}&count=20`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'user-key': APIKey,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const arr: object[] = [];
      data.restaurants.forEach(
        (res: {
          restaurant: {
            id: any;
            name: any;
            location: any;
            featured_image: any;
            user_rating: { aggregate_rating: any };
          };
        }) => {
          const condensed = {
            id: res.restaurant.id,
            name: res.restaurant.name,
            location: res.restaurant.location,
            img: res.restaurant.featured_image,
            rating: res.restaurant.user_rating.aggregate_rating,
          };
          arr.push(condensed);
        }
      );
      return { restaurnts: arr };
    });
};

export const handleUserSearchRequest = (options: any) => {
  return fetch(
    `https://asia-east2-project-4d358.cloudfunctions.net/api/search?q=${options.query}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.users)
    .catch((e) => console.log(e));
};
