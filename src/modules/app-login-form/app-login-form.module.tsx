'use client'

import React, { useState } from "react";

import Link from "next/link";
import { setCookie } from 'cookies-next';

import { useQueryClient } from "@tanstack/react-query";

import { loginFormFields } from "./config";

import { useFormik } from 'formik';
import * as yup from 'yup';

import * as validator from "@/validator/rules";
import Button from "@/ui/button";
import TextField from "@/ui/textField";
import * as formErrorHandler from "@/utils/forms-error-handler";
import { useRouter } from "next/navigation";
import { useLoginQuery } from "@/services/auth/queries";

const validationSchema = ({
  emailMessage,
  emailTestMessage,
  passwordMessage,
  passwordTestMessage,
}: {
  emailMessage: string;
  emailTestMessage: string;
  passwordMessage: string;
  passwordTestMessage: string;
}) => yup.object({
  email: validator.emailValidationSchema({
    emailMessage,
    emailTestMessage,
    emailTestName: "email-required",
  }),
  password: validator.passwordValidationSchema({
    passwordMessage,
    passwordTestMessage,
  }),
});


const AppLoginForm = (): JSX.Element => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<{ [key: string]: any }>({
    email: "",
    password: "",
  })

  const {
    mutate: loginMutation,
    reset: resetLoginError,
    isError: isLoginError,
    error: loginError,
  } = useLoginQuery();

  const queryClient = useQueryClient();

  const onSignUpButtonClick = () => {
    resetLoginError();
  }

  const submitHandle = (email: string, password: string) => {
    console.log(email);
    console.log(password);

    loginMutation({
      email,
      password,
    }, {
      onSuccess: ({ data }) => {
        queryClient.setQueryData(['user'], { data: data?.user });
        setCookie("token", data?.accessToken);
        router.push("/");
      },
    });
  }

  const handleChangeRegisterForm = (value: { [key: string]: any }) => {
    setLoginForm(prevState => ({
      ...prevState,
      ...value
    }))
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: loginForm,
    validationSchema: validationSchema({
      emailMessage: "Enter email",
      emailTestMessage: "Email not valid",
      passwordMessage: "Enter password",
      passwordTestMessage: "Password not valid"
    }),
    onSubmit: ({ email, password, }) => {
      submitHandle(email, password);
    }
  });

  return (
    <div>
      <h4 className="font-bold text-2xl text-center mb-6">Sign in</h4>
      <form
        onSubmit={formik.handleSubmit}
        className="mb-6"
      >
        {isLoginError && Boolean(loginError?.common) &&
          <p
            className="text-sm mb-1 text-pink-600"
          >
            {loginError?.common?.join(" ")}
          </p>
        }
        <div className="flex flex-col gap-4 w-full mb-16">
          {loginFormFields?.map(formField => {
            const { name, label, fullWidth, autoComplete, type } = formField;
            const isFieldTouched = formik.touched[name];

            return (
              <TextField
                key={name}
                name={name}
                value={loginForm[name]}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeRegisterForm({ [name]: e.target.value })}
                label={label}
                type={type}
                isError={
                  isFieldTouched &&
                  formErrorHandler.isFieldError({
                    fieldParameter: name,
                    formikContext: formik,
                    error: loginError,
                  })
                }
                helperText={
                  isFieldTouched &&
                  formErrorHandler.getFieldError({
                    fieldParameter: name,
                    formikContext: formik,
                    error: loginError,
                  })
                }
                fullWidth={fullWidth}
                autoComplete={autoComplete}
              />
            )
          })}
        </div>
        <Button
          className="w-full"
          type="submit"
          onClick={onSignUpButtonClick}
        >
          Sign in
        </Button>
      </form>
      <div className="flex items-center justify-between">
        <p>{"Don't have account?"}</p>
        <Link href={"/sign-up"}>
          <p className="font-bold">Sign up</p>
        </Link>
      </div>
    </div>
  )
}


export default AppLoginForm;