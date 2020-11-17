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

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const ProfileScreen = () => {
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
                <Image
                  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                  style={styles.avatar}
                />
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
                  <Button title="Follow" />
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
                    <Text>15</Text>
                    <Text>Posts</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Text>15</Text>
                    <Text>Followers</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Text>15</Text>
                    <Text>Following</Text>
                  </View>
                </View>
              </View>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <View style={styles.nameInfo}>
                  <Text>Hoya Lee</Text>
                  <Text>Sydney, Australia</Text>
                </View>
                <View style={{ marginTop: 30, marginBottom: 16 }}>
                  <View style={styles.divider} />
                </View>
                <View>
                  <Text style={{ textAlign: 'center' }}>
                    This is my bio.... my name is hoya and I am blah b;lah
                    blaj......
                  </Text>
                </View>
              </View>
            </View>
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
    borderRadius: 62,
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
