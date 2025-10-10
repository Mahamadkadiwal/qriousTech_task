import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '../schema/SignupSchema';
import {  useNavigate } from 'react-router-dom';
import "../Signup.css";
import CryptoJS from 'crypto-js';

function Signup() {
  const navigate = useNavigate();
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const [existsEmail, setexistsEmail] = useState('');
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors }, 
  } = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      birth_date: "",
      gender: "",
      mobile: ""
    },
  });

  // const onSubmit = (newUser) => {

  // delete newUser.confirmPassword;
  // let users = JSON.parse(localStorage.getItem('users'));

  //   if (!users) {
  //     users = [];
  //   }

  //   const existingUser = users.find((u) => u.email === newUser.email);
  //   if (existingUser) {
  //     setexistsEmail('Email already exists. Please use a different one.');
  //     return;
  //   }

  //   users.push(newUser);

  //   console.log(users);
  //   localStorage.setItem('users', JSON.stringify(users));

  //   const updatedUsers = JSON.parse(localStorage.getItem('users'));
  //   console.log(updatedUsers);

  //   reset();
  //   navigate('/signin');
  // };

  // encrypted data 
  const onSubmit = (newUser) => {

  delete newUser.confirmPassword;
  let encrypted_data = localStorage.getItem('users');

  let users = [];

  if(encrypted_data){
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted_data, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted) {
        users = JSON.parse(decrypted);
      }
    } catch (error) {
      console.error("Decryption error:", error);
    } 
  }

    const existingUser = users.find((u) => u.email === newUser.email);
    if (existingUser) {
      setexistsEmail('Email already exists. Please use a different one.');
      return;
    }

    users.push(newUser);
    console.log(users);
    console.log(existingUser);
    const encryptedUsers = CryptoJS.AES.encrypt(
    JSON.stringify(users),
    secretKey
    ).toString();

    console.log(encryptedUsers);
    localStorage.setItem('users', encryptedUsers);

    reset();
    navigate('/signin');
  };


  return (
    <div className='form-state'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          {existsEmail && <p>{existsEmail}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" {...register("confirmPassword")} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <label htmlFor="birth_date">Birth date</label>
          <input type="date" id="birth_date" {...register("birth_date")} />
          {errors.birth_date && <p>{errors.birth_date.message}</p>}
        </div>

        <div>
          <label>Gender</label><br />
          <label>
            <input type="radio" value="male" {...register("gender")} /> Male
          </label>
          <label>
            <input type="radio" value="female" {...register("gender")} /> Female
          </label>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input type="number" id="mobile" {...register("mobile")} />
          {errors.mobile && <p>{errors.mobile.message}</p>}
        </div>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
