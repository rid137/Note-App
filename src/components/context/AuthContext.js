import useLocalStorage from 'use-local-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, signOut, onAuthStateChanged, signInWithPopup,signInWithRedirect } from 'firebase/auth';
import { auth } from '../../Firebase-config';



const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider)
        signInWithRedirect(auth, provider);
    };

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider()
        signInWithRedirect(auth, provider);
        // signInWithPopup(auth, provider)
    }




//   .then((result) => {
//     // The signed-in user info.
//     const user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   });



    const logOut = () => {
        signOut(auth);
    };

    // TO MANAGE THE LOGIN AND LOGOUT STATUS OF USERS
    useEffect(() => {
        const manageUserState = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('user', currentUser)
        })
        return () => {
            manageUserState();
        }
    }, []);


    // FOR DARKLIGHT THEME
    const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
    };


    return (
        <AuthContext.Provider value={{googleSignIn, user, setUser, logOut, theme, switchTheme, facebookSignIn}}>
            {children}
        </AuthContext.Provider>
    )
};

// UserAuth Function Must Begin With Capital Letter Cos Of useContext Call
export const UserAuth = () => {
    return useContext(AuthContext)
};