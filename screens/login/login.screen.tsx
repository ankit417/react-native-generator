import React, {useCallback, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';

import {useDispatch, useSelector, RootState} from '@src/store';
import {Button, TextInput, VStack} from '@src/commons';
import {useAuth} from '@src/auth';

import {login} from './login.slice';
import {styles} from './login.style';

type LoginData = {
  email: string;
  password: string;
};

interface LoginProps extends NativeStackScreenProps<any> {}

const Login = ({}: LoginProps) => {
  const {logIn} = useAuth();
  const dispatch = useDispatch();
  const {loading, success, data} = useSelector(
    (state: RootState) => state.login,
  );

  const onSubmit = useCallback(
    (values: LoginData) => {
      dispatch(login({email: values.email, password: values.password}));
    },
    [dispatch],
  );

  useEffect(() => {
    if (success && data) {
      logIn();
    }
  }, [success, data, logIn]);

  return (
    <ScrollView style={styles.container}>
      <Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values}) => (
          <VStack style={styles.login}>
            <View style={styles.right}>
              <View style={styles.help}>
                <Text style={styles.helptext}>Help</Text>
              </View>
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Image
                  source={{
                    uri: 'http://143.110.243.194:3002/static/media/logo.c645f5dd901bf861b042.png',
                  }}
                  style={styles.logoImage}
                />
              </View>
            </View>

            <TextInput
              label="Username"
              placeholder="Username"
              value={values.email}
              onChangeText={handleChange('email')}
            />

            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />

            <VStack gap={20}>
              <View style={styles.forgetpassowrd}>
                <Text style={styles.forgetpassowrdtext}>Forgot Password</Text>
              </View>

              <Button
                style={styles.loginbutton}
                title="LOG IN"
                onPress={handleSubmit}
                loading={loading}
              />

              <View style={styles.donthaveaccountcontainer}>
                <View style={styles.donthaveaccount}>
                  <Text>Don't have an account?</Text>
                  <Text style={styles.signuptext}>Sign up</Text>
                </View>

                <Text style={styles.version}>Version: 1.0.0</Text>
              </View>
            </VStack>
          </VStack>
        )}
      </Formik>
    </ScrollView>
  );
};

export {Login};
