import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import SignupForm from '../components/SignupScreen/SignupForm';

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{uri: '', height: 100, width: 100}} />
      </View>
      <SignupForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alginItems: 'center',
    marginTop: 60,
  },
});

export default SignupScreen;
