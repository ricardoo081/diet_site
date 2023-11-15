const validation = (values) => {
  let error = {}
  const emailPatten = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // const passwordPatten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

  if (values.name === '') {
    error.name = 'Full Name is required!'
  } else {
    error.name = ''
  }

  if (values.email === '') {
    error.email = 'Email is required!'
  } else if (!emailPatten.test(values.email)) {
    error.email = "Email didn't match"
  } else {
    error.email = ''
  }

  if (values.password === '') {
    error.password = 'Password is required!'
    // } else if (!passwordPatten.test(values.password)) {
    //   error.password = "Password didn't match"
  } else {
    error.password = ''
  }
  return error
}

export default validation
