import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../../config/apiConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get('token') || null);
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();
  console.log(errorMessage);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);
  const rolee = Cookies.get('role_id');

  const login = async (login, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { login, password });
      const { token, user, is_teacher } = response.data.data;
      const {
        role_id: Role_ID,
        school_id,
        profile_picture: UserProfile,
        username: UserName,
        id: User_Id,
      } = user;

      if (Role_ID === 4 || (Role_ID === 5 && is_teacher === false)) {
        setErrorMessage('Unable to access: This user does not have access.');
        Cookies.remove('token'); // Remove token if it was set
        setAuthToken(null);
        throw new Error('Login failed: This user does not have access.');
      }

      Cookies.set('token', token, { expires: 7 });
      Cookies.set('role_id', Role_ID, { expires: 7 });
      Cookies.set('schoolId', school_id, { expires: 7 });
      Cookies.set('user_profile', UserProfile, { expires: 7 });
      Cookies.set('user_name', UserName, { expires: 7 });
      Cookies.set('User_Id', User_Id, { expires: 7 });
      Cookies.set('is_teacher', is_teacher, { expires: 7 });
      setAuthToken(token);
    } catch (error) {
      console.error('Login error:', error);

      throw error; // Re-throw the error so it can be caught in the try...catch
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('schoolId');
    Cookies.remove('role_id');
    Cookies.remove('mobs_Id');
    // Cookies.remove('school_Id');
    Cookies.remove('adv_Id');
    Cookies.remove('hops_Id');
    Cookies.remove('leaps_Id');
    Cookies.remove('user_profile');
    Cookies.remove('User_Id');

    setAuthToken(null);
    // navigate('/'); // Navigate to login page after logout
  };

  const ForgotPassword = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forget-password`, { email });
      setErrorMessage('');
      return { status: response.status, message: response.data.message };
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data.message) ||
        'Failed to send password reset link. Please try again.';
      setErrorMessage(errorMessage);
      return { status: 'error', message: errorMessage };
    }
  };

  const ChangePassword = async (resetToken, email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password/${resetToken}`, { email });
      setErrorMessage('');
      return { status: response.status, message: response.data.message };
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data.message) ||
        'Failed to send password reset link. Please try again.';
      setErrorMessage(errorMessage);
      return { status: 'error', message: errorMessage };
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, errorMessage, ForgotPassword, rolee }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
