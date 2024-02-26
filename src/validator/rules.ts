import * as yup from 'yup';
import { isUndefined } from '@/utils/isUndefinedChecker';

export const emailValidationSchema = ({
  emailMessage,
  emailTestMessage,
  emailTestName
}: {
  emailMessage: string;
  emailTestMessage: string;
  emailTestName: string;
}) => {
  return yup
    .string()
    .required(emailMessage)
    .test(emailTestName, emailTestMessage,
      function (value) {
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        let isValidEmail = emailRegex.test(value);
        if (!isValidEmail) {
          return false;
        }
        return true;
      })
}

export const passwordValidationSchema = ({
  passwordMessage,
  passwordTestMessage,
  minLength = 8
}: {
  passwordMessage: string;
  passwordTestMessage: string;
  minLength?: number;
}) => {
  return yup
    .string()
    .min(minLength, passwordTestMessage)
    .required(passwordMessage)
}

export const repeatedPasswordValidationSchema = ({
  passwordMessage,
  passwordTestMessage,
  passwordRepeatMessage,
  passwordRepeatRef,
  minLength = 8,
}: {
  passwordMessage: string;
  passwordTestMessage: string;
  passwordRepeatMessage: string;
  passwordRepeatRef: string;
  minLength?: number;
}) => {
  return yup
    .string()
    .oneOf([yup.ref(passwordRepeatRef), undefined], passwordRepeatMessage)
    .min(minLength, passwordTestMessage)
    .required(passwordMessage)
}

export const requiredStringValidationSchema = ({
  message,
}: {
  message: string;
}) => {
  return yup
    .string()
    .required(message)
}

export const requiredMultilineStringValidationSchema = ({
  message,
  minTextLength,
  minTextLengthMessage,
  maxTextLength,
  maxTextLengthMessage,
}: {
  message: string;
  minTextLength: number;
  minTextLengthMessage: string;
  maxTextLength: number;
  maxTextLengthMessage: string;
}) => {
  return yup
    .string()
    .required(message)
    .min(minTextLength, minTextLengthMessage)
    .max(maxTextLength, maxTextLengthMessage)
}

export const phoneValidationSchema = ({
  phoneMessage,
  phoneTestMessage,
  phoneTestName,
}: {
  phoneMessage: string;
  phoneTestMessage: string;
  phoneTestName: string;
}) => {
  return yup
    .string()
    .required(phoneMessage)
    .test(phoneTestName, phoneTestMessage,
      function (value) {
        const phoneRegex = /^\+?[1-9][0-9]{11,12}$/;

        let isValidPhone = phoneRegex.test(value);
        if (!isValidPhone) {
          return false;
        }
        return true;
      })
}

export const isValueTrueValidationSchema = ({
  message,
}: {
  message: string;
}) => {
  return yup
    .boolean()
    .oneOf([true], message)
    .required(message)
}

export const arrayValidationSchema = ({
  min,
  minMessage,
  max,
  maxMessage,
  message,
}: {
  min?: number,
  minMessage?: string,
  max?: number,
  maxMessage?: string,
  message?: string,
}) => {
  if (!isUndefined(min) && !isUndefined(max)) {
    return yup
      .array()
      .min(min as number, minMessage)
      .max(max as number, maxMessage)
  }
  if (!isUndefined(min)) {
    return yup
      .array()
      .min(min as number, minMessage)
  }
  if (!isUndefined(max)) {
    return yup
      .array()
      .max(max as number, maxMessage)
  }
  if (isUndefined(max) && isUndefined(min)) {
    return yup
      .array()
      .required(message)
  }
}