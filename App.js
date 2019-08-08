/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

const App = () => {
  const [state, setState] = React.useState({ isSigninInProgress: false });

  React.useEffect(() => {

  }, [])
  const _signIn = async () => {
    try {
      await GoogleSignin.configure({//1041648540964-3eo4vronk3t1s3lf6408uqpt9og52kbf.apps.googleusercontent.com
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '1041648540964-3eo4vronk3t1s3lf6408uqpt9og52kbf.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      GoogleSignin.revokeAccess();
      console.log('userInfo', userInfo);

      setState({ ...state, userInfo });
    } catch (error) {
      console.log('userInfo message', error.message);
      console.log('userInfo error code', error.code);
      console.log('userInfo error', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  const login = () => {
    firebase.auth()
      .signInWithEmailAndPassword('arshanwer91@gmail.com', 'Testtest123!')
      .then((res) => console.log('res', res))
      .catch((e) => console.log('e', e.message))
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_signIn}
            disabled={state.isSigninInProgress} />
          <Button title="Sign Up" onPress={login}></Button>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  }

});

export default App;
