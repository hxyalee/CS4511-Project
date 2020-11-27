export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  'Saved Posts': undefined;
  Profile: undefined;
};

export type HomeScreenParamList = {
  Home: undefined;
};
export type SearchScreenParamList = {
  Search: undefined;
  Profile: { username: string };
  Following: any;
  Followers: any;
};
export type AddScreenParamList = {
  Add: undefined;
  AddMoreInfo: undefined;
};
export type SavedScreenParamList = {
  'Saved Posts': undefined;
  Profile: { username: any };
};

export type ProfileScreenParamList = {
  Profile: { username: null | string };
  Followers: any;
  Following: any;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export interface Review {
  body: string;
  commentCount: number;
  comments: Array<string>;
  createdAt: string;
  cuisine: Array<string>;
  dietaryOptions: Array<string>;
  hearted: Array<string>;
  id: string;
  images: Array<string>;
  price: number;
  rating: number;
  restaurant: string;
  userHandle: string;
}
