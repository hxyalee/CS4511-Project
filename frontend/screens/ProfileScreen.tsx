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
} from 'react-native';
import Post from '../components/Post';
import {
  getFollowers,
  getSelf,
  getUserProfile,
  getFollowing,
  getHandle,
} from '../requests/user';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import { NavigationScreenProp } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BaseRouter } from '@react-navigation/native';
import { ButtonGroup } from 'react-native-elements';

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
  const [followers, setFollowers] = React.useState<string>([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [img, setImg] = React.useState('');
  const [followerObject, setFollowerObject] = React.useState<any>([]);
  const [followingObject, setFollowingObject] = React.useState<any>([]);
  const [isOwner, setIsOwner] = React.useState(false);
  const [userHandle, setUserHandle] = React.useState('');
  React.useEffect(() => {
    if (username) {
      getUserProfile(username)
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
      getSelf()
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
  }, []);
  React.useEffect(() => {
    getHandle()
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
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
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <View style={styles.nameInfo}>
                <Text>{handle}</Text>
                <Text>Sydney, Australia</Text>
              </View>
              <View>
                {desc !== '' && (
                  <Text style={{ textAlign: 'center' }}>{desc}</Text>
                )}
              </View>
              {!isOwner && (
                <Button
                  title={`${
                    followers.includes(userHandle) ? 'Unfollow' : 'Follow'
                  } `}
                />
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
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text>{followers.length}</Text>
                  <Text>Followers</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Following', { users: followingObject })
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
});

export default ProfileScreen;
