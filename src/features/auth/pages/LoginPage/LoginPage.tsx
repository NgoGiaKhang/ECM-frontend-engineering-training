import React, { useState } from 'react'

import styles from "./styles.module.css";
import { Validator } from '../../../../core/validator/Validator';
import { isEmail, isRequired } from '../../../../core/validator/validators';
import TextField from '../../../../components/FormField/TextField';
import Form from '../../../../components/FormField/Form';
import SubmitButton from '../../../../components/SubmitButton';
import { Loader, LoaderCircle } from 'lucide-react';
import { useAuthStore } from '../../auth.store';
import { authService } from '../../auth.service';
import type { ApiErrorResponse } from '../../../../api/types';
import { useNavigate } from 'react-router-dom';


const validator = new Validator({
  email: [
    isRequired("Email must not be empty"),
    isEmail(),

  ],
  password: [
    isRequired("Password must not be empty")
  ]
})

type FormData = {
  email: string,
  password: string
}

const initialForm: FormData = {
  email: "",
  password: ""
}


export default function LoginPage() {

  const [error, setError] = useState("")
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login)
  const handleLogin = async (a: FormData) => {
    try {
      const data = await authService.login(a.email, a.password);
      login(data.user, data.token)
      navigate("/")
    } catch (e) {
      const apiError = e as ApiErrorResponse
      setError(apiError.message)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Welcome back
        </h1>

        <p className={styles.subtitle}>
          Login to continue shopping
        </p>
        <p>
          {error}
        </p>
        <Form<FormData>
          className={styles.form}
          initialState={initialForm}
          onSubmit={(v) => handleLogin(v)}
          validator={validator}
        >
          <TextField
            type="email"
            placeholder="Email"
            name='email'
            className={styles.input}
          />

          <TextField
            type="password"
            name='password'
            placeholder="Password"
            className={styles.input}
          />

          <SubmitButton
            className={styles.button}
            loader={<LoaderCircle className={styles.loader} />}
          >
            Sign in
          </SubmitButton >
        </Form>

        <p className={styles.footerText}>
          Don’t have an account?{" "}
          <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
