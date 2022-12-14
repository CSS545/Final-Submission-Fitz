import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {firebase, db} from '../../firebase';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

// login fields and handle log in to firebase
const LoginForm = () => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email.required('An email is required'),
    password: Yup.string()
      .required()
      .min(8, 'Your password needs to have at least 8 characters '),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Firebase login succesful', email, password);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initalValues={{email: '', password: ''}}
        onSubmit={values => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, username and email"
                autoCapitalize="none"
                keyboardType="email-address"
                textConentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textConentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}>
              disabled={!isValid}
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity>
                <Text style={{color: '#6BB0F5'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alginItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default LoginForm;
