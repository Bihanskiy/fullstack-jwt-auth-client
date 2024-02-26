import { FormikContextType } from "formik";

type ErrorType = {
  [key: string]: string[]
}

export const isCommonError = (isError: boolean, error: ErrorType | null): boolean => {
  return isError &&
    Boolean(error?.non_field_errors || error?.common);
}

export const getCommonError = (error: ErrorType | null): string | undefined => {
  return error?.non_field_errors?.join(" ") ||
    error?.common?.join(" ")
}

export const isFieldError = (
  {
    fieldParameter = "",
    formikContext,
    error,
    localError,
  }: {
    fieldParameter?: string;
    formikContext?: FormikContextType<any>;
    error?: ErrorType | null;
    localError?: string;
  }): boolean => {
  return Boolean(formikContext?.errors[fieldParameter]) ||
    Boolean(error?.[fieldParameter]) ||
    Boolean(localError);
}

export const isFormikValidateFieldError = (
  {
    fieldParameter,
    formikContext,
  }: {
    fieldParameter: string;
    formikContext: FormikContextType<any>;
  }): boolean => {
  return Boolean(formikContext.errors[fieldParameter]);
}

export const getFieldError = (
  {
    fieldParameter = "",
    formikContext,
    error,
    localError,
  }: {
    fieldParameter?: string;
    formikContext?: FormikContextType<any>;
    error?: ErrorType | null;
    localError?: string;
  }): string | undefined => {
  return formikContext?.errors[fieldParameter] as string ||
    (error?.[fieldParameter]?.join(" ") ?? "") ||
    localError;
}