import * as yup from 'yup';

export const signInFormShape = yup.object().shape({
  email: yup.string()
    .email('Deve ser um email Valido')
    .required('Campo não pode ficar em branco'),
  password: yup.string()
    .required('Campo não pode ficar em branco'),
});


export const reviewFormShape = yup.object().shape({
  customer_name: yup.string()
    .required('Campo não pode ficar em branco'),
    review: yup.string()
    .required('Campo não pode ficar em branco'),
    img: yup.mixed(),
    attraction: yup.string()
    .required('Campo não pode ficar em branco'),
    rate: yup.string()
    .required('Campo não pode ficar em branco'),
});
