import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import {POSTS} from '../data/posts';
import BottomTabs, {bottomTabIcons} from '../components/home/BottomTabs';
import {db} from '../firebase';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    });
  });

  return (
    <SafeAreaView style={styles.containers}>
      <Header navigation={navigation} />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containers: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default HomeScreen;
