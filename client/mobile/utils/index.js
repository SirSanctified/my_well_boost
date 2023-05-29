import axios from "axios"
import { Alert } from "react-native"
import { useAuth } from "../context/auth"


const baseURL = 'http://192.168.1.128:4500/'

const isPasswordSimilar = (password1, password2) => {
  if (password1.length < 8 || password2.length < 8) {
    return false
  }
  return password1 === password2
}

const isEmailValid = (email) => {
  const emailRegex = /\S+@\S+\.\S+/
  return emailRegex.test(email)
}

const areCredentialsValid = (email, password1, password2) => {
  let result = true
  if (!isEmailValid(email)) {
    Alert.alert('Invalid Email', 'Please provide a valid email')
    result = false
  } else if (!isPasswordSimilar(password1, password2)){
    Alert.alert('Passwords do not match', 'Please make sure your passwords match')
    result = false
  }
  return result
}

const signUp = async(firstName, lastName, email, password, dateOfBirth, gender, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.post(`${baseURL}auth/register`,
    {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: dateOfBirth
    })
    if (response.status === 201) {
      setIsLoading(false)
      router.push('/activation/Activation')
    } else {
      throw new Error('Something went wrong. Please try again.')
    }
  } catch (err) {
    console.log(err)
    Alert.alert('Error', err.response.data)
    setIsLoading(false)
  }
}

const signIn = async(email, password, login, setIsLoading, router) => {
  if (isEmailValid(email) && password.length >= 8) {
    try {
      setIsLoading(true)
      const response = await axios.post(`${baseURL}auth/login`,
      {
        email: email,
        password: password,
      })
      if (response.status === 200) {
        setIsLoading(false)
        const {token, user} = response.data
        login(token, user)
        router.push('/history/History')
      } else {
        throw new Error('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      Alert.alert('', err.response.data.error)
    }
  } else {
    setIsLoading(false)
    Alert.alert('', 'Invalid email or password')
  }
}

const createRecommendation = async(healthHistory, healthGoals, userId, token, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.post(`${baseURL}recommendations/new/${userId}`, {
      healthHistory: healthHistory,
      healthGoals: healthGoals
    }, { headers: {"Authorization" : `Bearer ${token}`}})
    if (response.status === 201) {
      setIsLoading(false)
      router.push({pathname: '/dashboard/Dashboard', params: { userId: userId, token: token }})
    } else {
      throw new Error('Something went wrong. Please try again.')
    }
  } catch (err) {
    Alert.alert('', err.response.data.error)
    setIsLoading(false)
    // console.log(err)
  }
}

const activate = async(token, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.post(`${baseURL}auth/activate`, {
      activationToken: token
    })
    if (response.status === 200) {
      setIsLoading(false)
      router.push('/login/Login')
    } else {
      throw new Error('Something went wrong. Please try again.')
    }
  } catch(err) {
    Alert.alert('Error', err.response.data.error)
    console.log(err.response.data.error)
    setIsLoading(false)
  }
}

const getRecommendations = async(userId, token, setIsLoading, setRecommendations) => {
  try {
    setIsLoading(true)
    const response = await axios.get(`${baseURL}recommendations/${userId}`, { headers: {"Authorization" : `Bearer ${token}`}})
    if (response.status === 200) {
      setIsLoading(false)
      setRecommendations(response.data)
    } else {
      throw new Error('Something went wrong. Please try again')
    }
  } catch(error) {
    Alert.alert('Error', error.response.data.error)
  }
}

const resetPassword = async(userId, resetCode, password, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.post(`${baseURL}auth/reset-password/${userId}`, {
      password: password, resetCode: resetCode
    })
    if (response.status === 200) {
      setIsLoading(false)
      router.push('/login/Login')
    }
  } catch(err) {
    setIsLoading(false)
    Alert.alert('', err.response.data.error)
  }
}

const forgotPassword = async (email, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.post(`${baseURL}auth/forgot-password`, {email: email})
    if (response.status === 200) {
      setIsLoading(false)
      router.push({
        pathname: '/resetPassword',
        params: {userId: response.data.userId}
      })
    }
  } catch(err) {
    console.log(err)
    Alert.alert('', err.response.data.error)
  }
}

const logoutUser = async (id, token, logout, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.get(`${baseURL}auth/logout/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
    if (response.status === 204) {
      setIsLoading(false)
    } else {
      throw new Error('Something went wrong. Please try again')
    }
  } catch(err) {
    setIsLoading(false)
  } finally {
    await logout()
    router.replace('/')
  }
}

export { 
  areCredentialsValid, isEmailValid, isPasswordSimilar,
  signUp, signIn, createRecommendation, activate,
  getRecommendations, resetPassword, forgotPassword,
  logoutUser
}