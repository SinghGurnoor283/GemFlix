import React, { useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LOGO from './assets/Logo.png';
import checkValidateData from './utils/validate';
import { auth } from './utils/firebase';
import { addUser } from './utils/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const validationMsg = checkValidateData(
      email.current.value,
      password.current.value,
      !isSignInForm
    );
    setErrorMsg(validationMsg);
    if (validationMsg) return;

    try {
      if (!isSignInForm) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
        });

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: name.current.value,
          })
        );
      } else {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      }

      navigate('/browse');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        setErrorMsg('Email already in use. Try logging in.');
      } else if (errorCode === 'auth/weak-password') {
        setErrorMsg('Weak password. Use at least 6 characters.');
      } else if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/invalid-credential'
      ) {
        setErrorMsg('Invalid credentials or user not found.');
      } else if (errorCode === 'auth/wrong-password') {
        setErrorMsg('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/invalid-email') {
        setErrorMsg('Invalid email format.');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black px-4 py-10">
      <main className="w-full max-w-5xl bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        <section className="flex flex-col items-center justify-center text-center lg:text-left bg-gradient-to-br from-indigo-700 to-purple-700 p-10 space-y-4">
          <img src={LOGO} alt="Gemflix Logo" className="w-20 h-20 sm:w-24 sm:h-24" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Gemflix 🎬</h1>
          <p className="text-lg sm:text-lg text-indigo-200 font-medium">
            A universe of entertainment,<br>
            </br> tailored to your taste.
          </p>
        </section>

     
        <section className="p-8 sm:p-10 lg:p-12 bg-gray-800 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            {isSignInForm ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
            autoComplete="off"
          >
            {!isSignInForm && (
              <input ref={name} type="text" placeholder="Full Name" className="input-modern" />
            )}
            <input ref={email} type="email" placeholder="Email Address" className="input-modern" />
            <div className="relative">
              <input
                ref={password}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-modern pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-indigo-300 hover:text-indigo-100 text-lg"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                 {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center bg-red-800 bg-opacity-60 p-2 rounded-md">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              onClick={handleButtonClick}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-lg rounded-lg py-3 transition-transform hover:scale-105"
            >
              {isSignInForm ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-indigo-300 text-sm sm:text-base">
            {isSignInForm ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => {
                setIsSignInForm(!isSignInForm);
                setErrorMsg(null);
              }}
              className="ml-2 font-semibold hover:underline text-indigo-400"
            >
              {isSignInForm ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </section>
      </main>

      <style>{`
        .input-modern {
          background-color: #1f2937;
          border: 2px solid transparent;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #e0e7ff;
          width: 100%;
          transition: border-color 0.3s, background-color 0.3s;
        }
        .input-modern:focus {
          outline: none;
          border-color: #6366f1;
          background-color: #272f47;
          box-shadow: 0 0 9px #6366f1;
          color: #eef2ff;
        }
      `}</style>
    </div>
  );
};

export default Login;
