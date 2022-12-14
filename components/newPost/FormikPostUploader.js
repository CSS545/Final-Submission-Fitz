/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TextInput, Image, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Divider} from 'react-native-elements';
import {db, firebase} from '../../firebase';

const PLACEHOLDER_IMG = 'https://img.icons8.com/ios/100/ffffff/picture.png';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
});

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedinUser, setcurrentLoggedinUser] = useState(null);

  const getUsername = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection('user')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.doc.map(doc => {
          setcurrentLoggedinUser({
            username: doc.data().username,
          });
        }),
      );
    return unsubscribe;
  };
  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection('user')
      .doc(firebase.auth().currentUser.email)
      .collection('post')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedinUser.username,
        owner_uid: firebase.auth().currentUser.uid,
        caption: caption,
        likes: 0,
        likes_by_users: [],
      })
      .then(() => navigation.goBack());

    return unsubscribe;
  };
  return (
    <Formik
      initialValues={{caption: '', imageUrl: ''}}
      onSubmit={values => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, marginLeft: 12}}>
              <TextInput
                style={{color: 'white', fontSize: 15}}
                placeholder="Write a caption ..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
            <Image
              source={{uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG}}
              style={{width: 100, height: 100}}
            />
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            style={{color: 'white', fontSize: 15}}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{fontSize: 10, color: 'red'}}>{errors.imageUrl}</Text>
          )}

          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
