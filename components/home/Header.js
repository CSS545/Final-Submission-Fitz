import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firebase, db} from '../../firebase';

/*
  Header includes logo, add post, and notification
*/
const handleSignout = async () => {
  try {
    await firebase.auth().signOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.log(error);
  }
};
const Header = ({navigation}) => {
  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
    });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSignout()}>
        <Image style={styles.logo} source={require('../../assets/f.png')} />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image style={styles.icon} source={require('../../assets/add.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text styles={styles.unreadBadgeText}> 11 </Text>
          </View>
          <Image
            style={styles.icon}
            source={require('../../assets/heart.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alginItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    ResizeMode: 'contain',
  },

  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 25,
    bottom: 35,
    width: 25,
    height: 18,
    borderRadius: 25,
    alginItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Header;
