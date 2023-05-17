const isPasswordSimilar = (password1, password2) => {
  if (password1 === '' || password2 === '') {
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
    alert('Invalid email')
    result = false
  } else if (!isPasswordSimilar(password1, password2)){
    alert('Passwords do not match')
    result = false
  }
  return result
}


export { areCredentialsValid, isEmailValid, isPasswordSimilar }