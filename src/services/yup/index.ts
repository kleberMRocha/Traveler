import * as yup from 'yup';

export const signInFormShape = yup.object().shape({
  email: yup.string()
    .email('Deve ser um email Valido')
    .required('Campo não pode ficar em branco'),
  password: yup.string()
    .required('Campo não pode ficar em branco'),
});