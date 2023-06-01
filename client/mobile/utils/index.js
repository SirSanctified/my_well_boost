/* eslint-disable no-console */
import axios from 'axios';
import { Alert } from 'react-native';

const baseURL = 'http://192.168.191.40:4500/';

export const isPasswordSimilar = (password1, password2) => {
  if (password1.length < 8 || password2.length < 8) {
    return false;
  }
  return password1 === password2;
};

export const validateDob = (dob) => {
  const dobRegex = /\d{4}-\d{2}-\d{2}/;
  return dobRegex.test(dob);
};

export const isEmailValid = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const areCredentialsValid = (email, password1, password2) => {
  let result = true;
  if (!isEmailValid(email)) {
    Alert.alert('Invalid Email', 'Please provide a valid email');
    result = false;
  } else if (!isPasswordSimilar(password1, password2)) {
    Alert.alert('Passwords do not match', 'Please make sure your passwords match');
    result = false;
  }
  return result;
};

export const signUp = async (
  firstName,
  lastName,
  email,
  password,
  dateOfBirth,
  gender,
  setIsLoading,
  router,
) => {
  try {
    setIsLoading(true);
    const response = await axios.post(
      `${baseURL}auth/register`,
      {
        email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth,
      },
    );
    if (response.status === 201) {
      setIsLoading(false);
      router.push('/activation/Activation');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  } catch (err) {
    console.log(err);
    Alert.alert('Error', err.response.data);
    setIsLoading(false);
  }
};

export const signIn = async (email, password, login, setIsLoading, router) => {
  if (isEmailValid(email) && password.length >= 8) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseURL}auth/login`,
        {
          email,
          password,
        },
      );
      if (response.status === 200) {
        setIsLoading(false);
        const { token, user } = response.data;
        login(token, user);
        router.push('/history/History');
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      Alert.alert('', err.response.data.error);
    }
  } else {
    setIsLoading(false);
    Alert.alert('', 'Invalid email or password');
  }
};

export const createRecommendation = async (
  healthHistory,
  healthGoals,
  userId,
  token,
  setIsLoading,
  router,
) => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${baseURL}recommendations/new/${userId}`, {
      healthHistory,
      healthGoals,
    }, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 201) {
      setIsLoading(false);
      router.push({ pathname: '/dashboard/Dashboard', params: { userId, token } });
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  } catch (err) {
    Alert.alert('', err.response.data.error);
    setIsLoading(false);
    // console.log(err)
  }
};

export const activate = async (token, setIsLoading, router) => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${baseURL}auth/activate`, {
      activationToken: token,
    });
    if (response.status === 200) {
      setIsLoading(false);
      router.push('/login/Login');
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  } catch (err) {
    Alert.alert('Error', err.response.data.error);
    console.log(err.response.data.error);
    setIsLoading(false);
  }
};

export const getRecommendations = async (userId, token, setIsLoading, setRecommendations) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${baseURL}recommendations/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 200) {
      setIsLoading(false);
      setRecommendations(response.data);
    } else {
      throw new Error('Something went wrong. Please try again');
    }
  } catch (error) {
    Alert.alert('Error', error.response.data.error);
  }
};

export const resetPassword = async (userId, resetCode, password, setIsLoading, router) => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${baseURL}auth/reset-password/${userId}`, {
      password, resetCode,
    });
    if (response.status === 200) {
      setIsLoading(false);
      router.push('/login/Login');
    }
  } catch (err) {
    setIsLoading(false);
    Alert.alert('', err.response.data.error);
  }
};

export const forgotPassword = async (email, setIsLoading, router) => {
  try {
    setIsLoading(true);
    const response = await axios.post(`${baseURL}auth/forgot-password`, { email });
    if (response.status === 200) {
      setIsLoading(false);
      router.push({
        pathname: '/resetPassword',
        params: { userId: response.data.userId },
      });
    }
  } catch (err) {
    setIsLoading(false);
    console.log(err);
    Alert.alert('', err.response.data.error);
  }
};

export const logoutUser = async (id, token, logout, setIsLoading, router) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${baseURL}auth/logout/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 204) {
      setIsLoading(false);
    } else {
      throw new Error('Something went wrong. Please try again');
    }
  } catch (err) {
    setIsLoading(false);
  } finally {
    await logout();
    router.replace('/');
  }
};

export const getHistory = async (userId, token, setIsLoading, setHistory, setGoals) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${baseURL}recommendations/history/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 200) {
      setIsLoading(false);
      setHistory(response.data.medicalHistory);
      setGoals(response.data.healthGoals);
    } else {
      throw new Error('Something went wrong. Please try again');
    }
  } catch (err) {
    setIsLoading(false);
  }
};

export const updateProfile = async (userId, token, update, user, setIsloading) => {
  try {
    setIsloading(true);
    const response = await axios.put(`${baseURL}users/${userId}`, { userId, ...user }, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 200) {
      setIsloading(false);
      await update(user);
    } else {
      throw new Error('Something went wrong. Please try again');
    }
  } catch (err) {
    setIsloading(false);
    console.log(err);
  }
};

export const deleteProfile = async (userId, token, logout, setIsloading, router) => {
  try {
    setIsloading(true);
    const response = await axios.delete(`${baseURL}users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 200) {
      setIsloading(false);
    }
  } catch (err) {
    setIsloading(false);
    console.log(err);
  } finally {
    await logout();
    router.replace('/');
  }
};

export const getActivities = async (userId, token, setActivities, setIsLoading) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${baseURL}recommendations/activities/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 200) {
      setIsLoading(false);
      setActivities(JSON.parse(response.data));
    } else {
      throw new Error('Something went wrong, please try again');
    }
  } catch (error) {
    setActivities([error.response.data.error]);
    console.log(error);
    throw new Error('Something went wrong, please try again');
  }
};
