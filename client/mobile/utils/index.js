import axios from "axios"
import { Alert } from "react-native"


const baseURL = 'http://192.168.191.40:4500/'

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

const signIn = async(email, password, setIsLoading, router) => {
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
        router.push({pathname: '/dashboard/Dashboard', params: { user: response.data}})
      } else {
        throw new Error('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.log(err)
      Alert.alert('Error', err.response.data)
      setIsLoading(false)
    }
  } else {
    Alert.alert('', 'Invalid email or password')
  }
}

const createRecommendation = async(healthHistory, healthGoals, userId, setIsLoading, router) => {
  try {
    setIsLoading(true)
    const response = await axios.post(`${baseURL}recommendations/new/${userId}`, {
      healthHistory: healthHistory,
      healthGoals: healthGoals
    })
    if (response.status === 201) {
      setIsLoading(false)
      router.push({pathname: '/dashboard/Dashboard', params: { recommendations: response.data }})
    } else {
      throw new Error('Something went wrong. Please try again.')
    }
  } catch (error) {
    Alert.alert('Error', error.response.data)
    console.log(error)
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
    Alert.alert('Error', err.response.data)
    console.log(err)
  }
}

export { areCredentialsValid, isEmailValid, isPasswordSimilar, signUp, signIn, createRecommendation, activate }