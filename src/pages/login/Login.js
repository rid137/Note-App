import './login.css';
import ReactSwitch from 'react-switch';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from '../../Firebase-config';
import { UserAuth } from '../../components/context/AuthContext'
import { BsGoogle } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emsg, setEmsg] = useState([]);

  // FROM THE CONTEXT
  const { googleSignIn, facebookSignIn, user, setUser, theme, switchTheme } = UserAuth();

  const navigate = useNavigate()

  const handleEmailPasswordSignIn =  (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
      const userDetails = userCredential.user;
      setUser(userDetails)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setEmsg(errorMessage)
      console.log(errorMessage)
      // ..
    });
  }  
  
  const provider = new FacebookAuthProvider();


const handleFacebookSignIn = () => {
  // signInWithPopup(auth, provider)
  signInWithRedirect(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const userDetails = result.user;
    setUser(userDetails)

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}


      
  // const handleFacebookSignIn = async () => {
  //   try {
  //     await facebookSignIn()
  //   }
  //   catch(error) {
  //     console.log(error)
  //   }
  // }

  const handleGoogleSignIn = async () => {
      try {
        await googleSignIn()
      }
      catch(error) {
        console.log(error)
      }
  }

  // TO NAVIGATE AFTER LOGIN
  useEffect(() => {
    if(user != null) {
      navigate('/home')
    }
  }, [user]);


  return (
    <div>
      <div className="app" data-theme={theme}>
      <div className='login'>
        <h1> Sign In</h1>
        <div className='container'>
          <div className='top'>
            <BsGoogle onClick={handleGoogleSignIn} />
            <FaFacebookSquare onClick={handleFacebookSignIn} />
            <AiFillTwitterSquare />
          </div>
          <p className='divider'><span>Or</span></p>
          <form>
            <label>E-mail</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />

            <label>Password</label>
            <input type='text' onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />

            {emsg && 
              <p style={{color: 'red', fontSize: '.8rem'}}>{emsg}</p>
            }

            <div className='remember'>
              <input type='checkbox' defaultChecked='checked' />
              <p>Remember Me</p>
            </div>

            <button onClick={handleEmailPasswordSignIn}>Sign In</button>
          </form>
          <div className='bottom'>
            <p>Forget your password?</p>
            <a href='/'>Reset Password</a>
          </div>
          <Link to='/register' className='create'>Create Account</Link>
        </div>
        <div className='theme-toggle'>
          <h2>{theme} mode</h2>
          <ReactSwitch onChange={switchTheme} checked={theme === 'dark'} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
