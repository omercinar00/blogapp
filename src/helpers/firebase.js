import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "./toastNotify";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7ra6qpudK2BU-MsdYALqTld9NaLBYmhs",
  authDomain: "fireblogomer.firebaseapp.com",
  databaseURL: "https://fireblogomer-default-rtdb.firebaseio.com",
  projectId: "fireblogomer",
  storageBucket: "fireblogomer.appspot.com",
  messagingSenderId: "497808416975",
  appId: "1:497808416975:web:94b60f2f947835c52a57ba",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    // navigate("/");
    toastSuccessNotify("Registered successfully!");
    // console.log(userCredential);
  } catch (error) {
    console.log(error.message)
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
      console.log(user);
    } else {
      setCurrentUser(false);
      console.log("user signed out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully!");
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => settings => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};