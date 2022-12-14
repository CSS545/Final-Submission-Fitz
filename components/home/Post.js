/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';
import {firebase, db} from '../../firebase';

// handle likes
const Post = ({post}) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email,
    );

    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email,
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email,
            ),
      });
  };

  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 10, marginTop: 20}}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
      </View>
    </View>
  );
};

// user profile picture and name
const PostHeader = ({post}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alginItems: 'center',
    }}>
    <View style={{flexDirection: 'row', alginItems: 'center', top: 5}}>
      <Image source={{uri: post.profile_picture}} style={styles.story} />
      <Text style={{color: 'white', marginLeft: 5, fontWeight: '500', top: 7}}>
        {post.user}
      </Text>
    </View>
    <TouchableOpacity>
      <Text style={{color: 'white', fontWeight: '800'}}>...</Text>
    </TouchableOpacity>
  </View>
);

// post image
const PostImage = ({post}) => (
  <View
    style={{
      width: '100%',
      height: 400,
      top: 10,
    }}>
    <Image
      source={{uri: post.imageUrl}}
      style={{height: '100%', resizeMode: 'cover'}}
    />
  </View>
);

// like, share, save, and shopping icons
const PostFooter = ({handleLike, post}) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{uri: postFooterIcons[0].imageUrl}}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
);

const Likes = ({post}) => (
  <View style={{flexDirection: 'row', marginTop: 4}}>
    <Text style={{color: 'white', fontWeight: '600'}}>
      {post.likes_by_users.length.toLocaleString('en')} likes
    </Text>
  </View>
);

const Caption = ({post}) => (
  <View style={{marginTop: 5}}>
    <Text style={{color: 'white'}}>
      <Text style={{fontWeight: '600'}}>{post.user} </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/ios-glyphs/60/ffffff/hearts.png',
    likedImagedUrl: 'https://icons8.com/icon/10287/favorite',
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/windows/64/ffffff/share-rounded.png',
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/ios-glyphs/60/ffffff/hand-drawn-star.png',
    savedImageUrl: 'https://icons8.com/icon/UfBpaTvDrs-s/hand-drawn-star',
  },
  {
    name: 'Shopping',
    imageUrl: 'https://img.icons8.com/material/48/ffffff/shopaholic.png',
  },
];

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});

export default Post;
