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