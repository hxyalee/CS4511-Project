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
import { fetchUser } from '../requests/user';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const ProfileScreen = () => {
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const [following, setFollowing] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [img, setImg] = React.useState('');
  React.useEffect(() => {
    fetchUser()
      .then((res) => {
        console.log(res);
        setName(res.handle);
        setDesc(res.description);
        setHandle(res.handle);
        setFollowing(res.following);
        setFollowers(res.followers);
        setReviews(res.reviews);
        setImg(res.imageURL);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <View style={styles.profile}>
      <View style={{ display: 'flex' }}>
        <ImageBackground
          source={require('../assets/images/profile-screen-bg.png')}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '25%' }}
          >
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
                    marginTop: 20,
                    paddingBottom: 24,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Button title="Follow" onPress={() => {}} />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
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
            </View>
            {reviews &&
              reviews.map((review) => {
                return <Post key={review.id} data={review} />;
              })}
          </ScrollView>
        </ImageBackground>
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
    // padding: theme.SIZES.BASE,
    // marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
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
