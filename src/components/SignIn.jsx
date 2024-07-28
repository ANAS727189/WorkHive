import React from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ setAuthenticated }) => {

  const handleCredentialResponse = (response) => {
    const { credential } = response;
    fetch('http://localhost:3000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Ensure cookies are sent
      body: JSON.stringify({ token: credential })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setAuthenticated(true);
        toast.success('Signed in successfully!');
      } else {
        toast.error('Sign in failed!');
      }
    })
    .catch(err => {
      toast.error('Sign in failed!');
      console.error(err);
    });
  };

  const responseMessage = (response) => {
    handleCredentialResponse(response);
  };

  const errorMessage = (error) => {
    toast.error('Sign in failed!');
    console.error('Error: ', error);
  };

  return (
    <div>
      <h2>Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
};

export default GoogleAuth;
