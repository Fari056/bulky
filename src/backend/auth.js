import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ToastError } from '../utilities';
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import appleAuth from '@invertase/react-native-apple-authentication';
import firestore from "@react-native-firebase/firestore";

export async function signUp(USER) {
  let success = true;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(USER.email, USER.password)
    .then(async user => {
      success = user?.user?.uid
    })
    .catch(function (error) {
      success = false;
      // console.log(error.code + ': ' + error.message);
      // Toast.show(error.code + ': ' + error.message);
    });
  return success;
}

export async function signIn(email, password, rememberme) {
  let success = false;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      if (rememberme) {
        // AsyncStorage.setItem('Token', user.user.uid);
      }
      success = { res: true, user: user.user.uid }
    })
    .catch(function (error) {
      ToastError(error?.code)
      console.log('error', error?.code)
      success = { res: false, error: error.message };
    });
  return success;
}

export async function checkEmailAlreadyInUse(email, callback) {
  let emails = await firebase
    .auth()
    .fetchSignInMethodsForEmail(email.trim());
  callback(emails.length > 0)
}

export async function getCurrentUserId() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    return user.uid;
  }
  else {
    // Toast.show('Seccion Expired Please Login Again')
  }
}
export async function Logout() {
  await firebase.auth().signOut().catch(error => { });
}

export async function ResetPassword(email) {
  let success = true
  await firebase
    .auth().sendPasswordResetEmail(email)
    .then(function (user) {
      success = true
      // alert('Please check your email...', user)
    }).catch(function (e) {
      success = e.message
    })
  return success
}

export async function getCurrentUserToken() {
  return await firebase.auth().currentUser.getIdToken()
}

export const _GoogleSignin = async () => {
  const fetch = require("node-fetch");
  const checkGoogleAccountStatus = async (idToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
      );
      const result = await response.json();
      return !result.email_verified;
    } catch (error) {
      console.error("Error checking Google account status:", error);
      return false;
    }
  };
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: "53101824871-h7mf8obbachc3eq4mhvubmfdm0mhg3gl.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const response = await GoogleSignin.signIn();
    const { idToken, user } = response.data;
     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    const isAccountDeleted = await checkGoogleAccountStatus(idToken);
     const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
     const firebaseUser = firebaseUserCredential.user;
     const uid = firebaseUser.uid;
     const isNewUser = firebaseUserCredential.additionalUserInfo.isNewUser;
     console.log("userID:", uid, isNewUser);
     return { user, uid, accountDeleted: isAccountDeleted, isNewUser };
  } catch (error) {
    console.log("Error during Google Sign-In:", error);
    return null;
  }
};

export async function googleAuthentication(setLoading) {
  setLoading(true)
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn();
    // console.log('User Info --> ', userInfo);
    const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)

    const user = await auth().signInWithCredential(credential)
    return user


  } catch (error) {
    setLoading(false)
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      ToastError('Google authentication is in progress already')
      console.log('Google authentication is in progress already')
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      ToastError('Play services not available or outdated')
      console.log('Play services not available or outdated')
      // play services not available or outdated
    } else {
      ToastError(error.message)
      console.log(error.message)
      // some other error happened
    }
    // 
  }
}

export const AppleAuthentication = async (setLoading) => {
  setLoading(true)
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken) {
      setLoading(false)
      console.log('Apple Sign-In failed - no identity token returned')
    }
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    const user = await auth().signInWithCredential(appleCredential)
    // setLoading(false)
    return user
  }
  catch (error) {
    setLoading(false)
    console.log(error.message)
  }
}

export async function deleteAccount_(password) {
  let success = false;
  const currentUser = auth().currentUser;
  if (!currentUser) {
    return { success: false, message: "No user is currently signed in" };
  }
  try {
    const credential = auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    await currentUser.reauthenticateWithCredential(credential);
    const userDocRef = firestore().collection("users").doc(currentUser.uid);
    await userDocRef.delete();
    await currentUser.delete();
    success = true;
    return {
      success,
      message: "Account and associated data successfully deleted.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
