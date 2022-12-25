import './register.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase-config';
import { UserAuth } from '../../components/context/AuthContext'
import { BsGoogle } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firebaseErrmsg, setFirebaseErrmsg] = useState([])
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState(false)


  const { googleSignIn, user, setUser, theme } = UserAuth()

  const navigate = useNavigate()

  const handleEmailPasswordSignUp =  (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      setConfirmPasswordErrMsg(true)
      return;
    }


    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
      const userDetails = userCredential.user;
      setUser(userDetails)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setFirebaseErrmsg(errorMessage)
      console.log(errorMessage)
    });
  }    
       
    
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    }
    catch(error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if(user != null) {
      navigate('/home')
    }
  }, [user]);


  return (
    <div>
      <div className="register-wrapper" data-theme={theme}>
      <div className='register'>
        <h1> Create Account </h1>
        <div className='container'>
          <div className='top'>
            <BsGoogle onClick={handleGoogleSignIn} />
            <FaFacebookSquare />
            <AiFillTwitterSquare />
          </div>
          <p className='divider'><span>Or</span></p>
          <form>
            <label>E-mail</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />

            <label>Password</label>
            <input type='text' onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />

            <label>Confirm Password</label>
            <input type='text' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter your password' />

            {
              confirmPasswordErrMsg && <p style={{color: 'red'}}>Password does not match</p>
            }
            {firebaseErrmsg && 
              <p style={{color: 'red'}}>{firebaseErrmsg}</p>
            }

            <div className='remember'>
              <input type='checkbox' defaultChecked='checked' />
              <p>Remember Me</p>
            </div>
            <button onClick={handleEmailPasswordSignUp}>Sign Up</button>
          </form>
          <div className='register-footer'>
            <p>Why Create an Account?</p>
            <p>By creating this account, you agree to our <span>Privacy Policy</span> & <span>Cookie Policy</span>.</p>
          </div>
        </div>       
      </div>
    </div>
    </div>
  );
}

export default Register;
