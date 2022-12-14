/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FormikPostUploader from '../newPost/FormikPostUploader';

const AddNewPost = ({navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <FormikPostUploader navigation={navigation} />
  </View>
);

const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>Add new Post</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alginItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    marginRight: 25,
  },
});

export default AddNewPost;
