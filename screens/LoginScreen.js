import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import LoginForm from '../components/loginScreen/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{uri: '', height: 100, width: 100}} />
      </View>
      <LoginForm />
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

export default LoginScreen;
