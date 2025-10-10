import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {SigninSchema} from "../schema/SigninSchema";
import { useNavigate } from 'react-router-dom';
import "../Signup.css";
import CryptoJS from 'crypto-js';

const Signin = () => {
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const navigate = useNavigate();
  const { 
      register, 
      handleSubmit, 
      reset,
      formState: { errors }, 
    } = useForm({
      resolver: zodResolver(SigninSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    const onSubmit = (data) => {
      let encrypted_data = localStorage.getItem('users');
      let users = [];
      if(!encrypted_data){
          alert('No data found');        
      }
      if(encrypted_data){
          const bytes = CryptoJS.AES.decrypt(encrypted_data, secretKey);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          if(decrypted){
            users = JSON.parse(decrypted);
          } 
        }  

      const user = users.find((u) => u.email === data.email && 
      u.password === data.password);

      if(user){
        console.log('Login Successful');
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();
        localStorage.setItem('currentUser', encryptedUser); 
        reset();
        navigate('/home');
      }
      else{
        console.log('Invalid Credentails');
        alert('Invalid Credentails');
      }
    };

   return (
    <div className='form-state'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        

        
        
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin