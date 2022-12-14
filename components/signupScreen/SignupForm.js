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
import Validator from 'email-validator';

const SignupForm = () => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email.required('An email is required'),
    username: Yup.string()
      .required()
      .min(2, 'A username needs to have at least 2 characters'),
    password: Yup.string()
      .required()
      .min(8, 'Your password needs to have at least 8 characters '),
  });

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('Firebase user created successfully');

      db.collection('user').doc(authUser.user.email).set({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initalValues={{email: '', password: ''}}
        onSubmit={values =>
          onSignup(values.email, values.password, values.username)
        }
        validationSchema={SignupFormSchema}
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
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
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

export default SignupForm;
