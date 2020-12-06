import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Button,
  View,
  Text,
  Modal,
} from 'react-native';
import Post from '../components/Post';
import {
  getFollowers,
  getSelf,
  getUserProfile,
  getFollowing,
  getHandle,
  unfollow,
  follow,
  uploadPhoto,
} from '../requests/user';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { BaseRouter, useNavigation } from '@react-navigation/native';
import { ButtonGroup, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

interface RouteProps {
  route: any;
}
const ProfileScreen = (props: any) => {
  const navigation = props.navigation;
  const username = props.route.params.username;
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const [following, setFollowing] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [img, setImg] = React.useState('');
  const [followerObject, setFollowerObject] = React.useState<any>([]);
  const [followingObject, setFollowingObject] = React.useState<any>([]);
  const [isOwner, setIsOwner] = React.useState(false);
  const [userHandle, setUserHandle] = React.useState('');
  const [myFollowing, setMyFollowing] = React.useState('');
  const [token, setToken] = React.useState<null | string>('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigator = useNavigation();
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
    navigator.addListener('focus', () => {
      if (!token) return;
      if (username) {
        getUserProfile(token, username)
          .then((res) => {
            setName(res.user.handle);
            setDesc(res.user.description);
            setHandle(res.user.handle);
            setFollowing(res.user.following);
            setFollowers(res.user.followers);
            setReviews(res.reviews);
            setImg(res.user.imageURL);
          })
          .catch((e) => console.log(e));
      } else {
        getSelf(token)
          .then((res) => {
            setName(res.user.name);
            setDesc(res.user.description);
            0;
            setHandle(res.user.handle);
            setFollowing(res.user.following);
            setFollowers(res.user.followers);
            setReviews(res.reviews);
            setImg(res.user.imageURL);
          })
          .catch((e) => console.log(e));
      }
    });
  });
  React.useEffect(() => {
    if (!token) return;
    if (username) {
      getUserProfile(token, username)
        .then((res) => {
          setName(res.user.handle);
          setDesc(res.user.description);
          setHandle(res.user.handle);
          setFollowing(res.user.following);
          setFollowers(res.user.followers);
          setReviews(res.reviews);
          setImg(res.user.imageURL);
        })
        .catch((e) => console.log(e));
    } else {
      getSelf(token)
        .then((res) => {
          setName(res.user.name);
          setDesc(res.user.description);
          0;
          setHandle(res.user.handle);
          setFollowing(res.user.following);
          setFollowers(res.user.followers);
          setReviews(res.reviews);
          setImg(res.user.imageURL);
        })
        .catch((e) => console.log(e));
    }
  }, [token, img]);
  React.useEffect(() => {
    if (!token) return;
    getSelf(token).then((res) => setMyFollowing(res.user.following));
  }, []);
  React.useEffect(() => {
    if (!token) return;
    getHandle(token)
      .then((res) => {
        setUserHandle(res.user);
        if (res.user === handle) setIsOwner(true);
        else setIsOwner(false);
      })
      .catch((e) => console.log(e));
  }, [handle]);
  React.useEffect(() => {
    if (!handle) return;
    getFollowers(handle).then((res) => setFollowerObject(res.users));
    getFollowing(handle).then((res) => setFollowingObject(res.users));
  }, [handle]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
      .then((res) => {
        if (res.cancelled) return;
        const filepath = res.uri;
        return FileSystem.readAsStringAsync(filepath, {
          encoding: FileSystem.EncodingType.Base64,
        }).then((base64) => {
          setImg(base64);
          if (!token) return;
          uploadPhoto(token, base64).then((res) => console.log(res));
        });
      })
      .catch((e) => console.log(e));
  };
  const handleFollowUser = () => {
    console.log('asdasd');
    if (!token) return;
    if (myFollowing.includes(userHandle)) {
      unfollow(token, username).then(() => {
        if (username) {
          getUserProfile(token, username)
            .then((res) => {
              setName(res.user.handle);
              setDesc(res.user.description);
              setHandle(res.user.handle);
              setFollowing(res.user.following);
              setFollowers(res.user.followers);
              setReviews(res.reviews);
              setImg(res.user.imageURL);
            })
            .catch((e) => console.log(e));
        } else {
          getSelf(token)
            .then((res) => {
              setName(res.user.name);
              setDesc(res.user.description);
              setHandle(res.user.handle);
              setFollowing(res.user.following);
              setFollowers(res.user.followers);
              setReviews(res.reviews);
              setImg(res.user.imageURL);
            })
            .catch((e) => console.log(e));
        }
      });
    } else {
      follow(token, username).then((res) => {
        console.log(res);
        if (username) {
          getUserProfile(token, username)
            .then((res) => {
              console.log(res.user.followers);
              setName(res.user.handle);
              setDesc(res.user.description);
              setHandle(res.user.handle);
              setFollowing(res.user.following);
              setFollowers(res.user.followers);
              setReviews(res.reviews);
              setImg(res.user.imageURL);
            })
            .catch((e) => console.log(e));
        } else {
          getSelf(token)
            .then((res) => {
              setName(res.user.name);
              setDesc(res.user.description);
              0;
              setHandle(res.user.handle);
              setFollowing(res.user.following);
              setFollowers(res.user.followers);
              setReviews(res.reviews);
              setImg(res.user.imageURL);
            })
            .catch((e) => console.log(e));
        }
      });
    }
  };

  return (
    <View style={styles.profile}>
      <View style={{ display: 'flex' }}>
        <BackgroundDecoration
          style={{
            position: 'absolute',
            top: -40,
            left: -40,
            right: 0,
            bottom: 0,
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ marginBottom: 10 }}>
                <Button
                  title="Log out"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <Button
                title="Cancel"
                color="#FF5621"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage}>
                {img === '' ? (
                  <Image
                    source={require('../assets/images/nopic.jpeg')}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={{ uri: `data:image/gif;base64,${img}` }}
                    style={styles.avatar}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.settingsContainer}>
              <Icon
                color={'#ccc'}
                size={30}
                name="cog"
                type="font-awesome"
                onPress={() => setModalVisible(true)}
              />
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <View style={styles.nameInfo}>
                <Text style={{ fontSize: 20 }}>{name}</Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic' }}>
                  {handle.length > 0 && `@${handle}`}
                </Text>
                <Text>Sydney, Australia</Text>
              </View>
              <View>
                {desc !== '' && (
                  <Text style={{ textAlign: 'center' }}>{desc}</Text>
                )}
              </View>
              {!isOwner && (
                <TouchableOpacity
                  onPress={handleFollowUser}
                  style={{
                    backgroundColor: '#618eff',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    margin: 5,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {`${
                      followers.includes(userHandle) ? 'Unfollow' : 'Follow'
                    }`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.info}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text>{reviews.length}</Text>
                  <Text>Reviews</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Followers', {
                      users: followerObject,
                      followingUsers: following,
                      myFollowing: myFollowing,
                    })
                  }
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text>{followers.length}</Text>
                  <Text>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Following', {
                      users: followingObject,
                      followingUsers: following,
                      myFollowing: myFollowing,
                    })
                  }
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text>{following.length}</Text>
                  <Text>Following</Text>
                </TouchableOpacity>
              </View>
            </View>
            {reviews &&
              reviews.map((review) => {
                return (
                  <Post
                    key={Math.floor(Math.random() * 1000000) + 1}
                    data={review}
                  />
                );
              })}
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
    display: 'flex',
    backgroundColor: '#333',
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    display: 'flex',
    padding: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    position: 'relative',
    marginBottom: 20,
    // padding: theme.SIZES.BASE,
    // marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderRadius: 10,
    // backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 100,
    marginTop: 20,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  settingsContainer: {
    position: 'absolute',
    top: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfileScreen;
