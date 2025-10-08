import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {SigninSchema} from "../schema/SigninSchema";
import { useNavigate } from 'react-router-dom';
import "../Signup.css";

const Signin = () => {
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
      const allUser = JSON.parse(localStorage.getItem('users'));

      const user = allUser.find((u) => u.email === data.email && 
      u.password === data.password);

      if(user){
        console.log('Login Successful');
        localStorage.setItem('currentUser', JSON.stringify(user));
        reset();
        navigate('/home');
      }
      else{
        console.log('Invalid Credentails');
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