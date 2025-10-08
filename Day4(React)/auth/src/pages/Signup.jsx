// src/components/SignupForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schema/SignupSchema';

function Signup() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    } = useForm({
    resolver: zodResolver(signupSchema),
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

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

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

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="birth_date">Birth date</label>
        <input type="date" name="birth_date" id="birth_date" {...register("birth_date")} />
        {errors.birth_date && <p>{errors.birth_date.message}</p>}
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <radio type="radio" name="gender" id="gender" value="male" {...register("gender")} />
        <radio type="radio" name="gender" id="gender" value="female" {...register("gender")} />
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="mobile">Mobile</label>
        <input type="number" name="mobile" id="mobile" {...register("mobile")} />
        {errors.mobile && <p>{errors.mobile.message}</p>}
      </div>
      
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;