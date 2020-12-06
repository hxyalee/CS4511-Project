import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Avatar } from 'react-native-elements';
import { getUser } from '../requests/user';

export default function PostAvatar(props: { user: string; size: number }) {
  const [loading, setLoading] = useState(true);
  const [userImage, setUserImage] = useState('');
  const [token, setToken] = React.useState<null | string>('');
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch {
      console.log('no token');
    }
  };
  React.useEffect(() => {
    getToken();
  }, []);
  React.useEffect(() => {
    if (!token) return;
    setLoading(true);
    getUser(token, props.user)
      .then((userData) => {
        setLoading(false);
        setUserImage(userData.imageURL);
      })
      .catch((e) => console.log('Failed to get user'));
  }, [token, props.user]);

  const defaultAvatar = (
    <Avatar
      rounded
      title={props.user[0].toUpperCase()}
      overlayContainerStyle={{ backgroundColor: '#BDBDBD' }}
      size={props.size ? props.size : 'small'}
    />
  );

  return loading || !userImage ? (
    defaultAvatar
  ) : (
    <Avatar
      rounded
      source={{ uri: `data:image/gif;base64,${userImage}` }}
      size={props.size ? props.size : 'small'}
    />
  );
}
