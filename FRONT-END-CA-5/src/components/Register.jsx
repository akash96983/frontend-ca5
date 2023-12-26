import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [navigates,setNavigates]=useState(false)

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    repeatPasswordError: '',
  });

  const validateForm = () => {
    let isValid = true;

    // Resetting errors
    setErrors({
      nameError: '',
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
    });

    // Validation logic for each field
    if (name.length < 3 || name.length > 30) {
      setErrors((prevErrors) => ({ ...prevErrors, nameError: 'Name should be between 3 and 30 characters' }));
      isValid = false;
    }

    if (!email.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Please enter a valid email address' }));
      isValid = false;
    }

    if (password.length < 10 || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Password must contain 10 characters with special character',
      }));
      isValid = false;
    }

    if (repeatPassword !== password) {
      setErrors((prevErrors) => ({ ...prevErrors, repeatPasswordError: 'Passwords do not match' }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = validateForm();

    // Additional check for empty fields
    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, nameError: 'Name is required' }));
      isValid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Email is required' }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 'Password is required' }));
      isValid = false;
    }

    if (!repeatPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, repeatPasswordError: 'Repeat Password is required' }));
      isValid = false;
    }


    if (isValid) {
      console.log('Form submitted successfully:', { name, email, password });
      setNavigates(true)
    } else {
      console.log('Form contains errors. Please check.');
    }
  };
  const navigate=useNavigate()
  navigates &&  navigate("/")

  return (
    <div id="registerwholepage">
      <div className="form">
        <h1 id="register">Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="inputs"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.nameError && <p className="error">{errors.nameError}</p>}
          </div>
          <div>
            <input
              className="inputs"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.emailError && <p className="error">{errors.emailError}</p>}
          </div>
          <div>
            <input
              className="inputs"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.passwordError && <p className="error">{errors.passwordError}</p>}
          </div>
          <div>
            <input
              className="inputs"
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.repeatPasswordError && <p className="error">{errors.repeatPasswordError}</p>}
          </div>
          <button id="signup" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
  