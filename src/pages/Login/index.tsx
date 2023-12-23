import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
//import { fetchUserData } from "../../redux/slices/auth";

import styles from "./Login.module.scss";

export const Login = () => {
  //   const dispatch = useDispatch()
  //   const {
  //     register,
  //     handleSubmit,
  //     setError,
  //     formState: { errors, isValid }
  //   } = useForm({
  //     defaultValues: {
  //       email: 'user1234name@domain.com',
  //       password: '1234'
  //     },
  //     mode: 'all'
  //   })

  //   const onSubmit = (values) => {
  //     dispatch(fetchUserData(values))
  //   }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в аккаунт
      </Typography>

      <form
      //onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          className={styles.field}
          label="E-Mail"
          error
          // helperText={errors.email?.message}
          // {... register('email', {required: 'type in your email'})}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          // helperText={errors.password?.message}
          fullWidth
          //  {... register('password', {required: 'type in your password'})}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
