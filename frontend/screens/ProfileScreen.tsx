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
import { getSelf, getUserProfile } from '../requests/user';
import BackgroundDecoration from '../assets/images/background-circles.svg';
import { NavigationScreenProp } from 'react-navigation';

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

  console.log(username);
  React.useEffect(() => {
    if (username) {
      getUserProfile(username)
        .then((res) => {
          console.log(res);
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
          setName(res.user.handle);
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
  return (
    <View style={styles.profile}>
      <View style={{ display: 'flex' }}>
        {/* <ImageBackground
          source={require('../assets/images/profile-screen-bg.png')}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        > */}
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
                <Image source={{ uri: img }} style={styles.avatar} />
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
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text>{following.length}</Text>
                  <Text>Following</Text>
                </View>
              </View>
            </View>
            {reviews &&
              reviews.map((review) => {
                return <Post key={review.reviewId} data={review} />;
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
    marginTop: 35,
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
