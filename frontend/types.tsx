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
};
export type AddScreenParamList = {
  Add: undefined;
  AddMoreInfo: undefined;
};
export type SavedScreenParamList = {
  'Saved Posts': undefined;
};

export type ProfileScreenParamList = {
  Profile: { username: null | string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export interface Review {
  createdAt: string;
  cuisine: string;
  description: string;
  dietaryOptions: Array<string>;
  id: string;
  imageUrl: string;
  likes: Array<string>;
  price: number;
  rating: number;
  restaurant: string;
  userHandle: string;
}
