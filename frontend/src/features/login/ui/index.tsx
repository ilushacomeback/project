import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { selectors, useAppSelector, useLogin, AuthContext, UI, staticRoutes } from '@/shared';

interface InputsForm {
  email: string;
  password: string;
}

const LinkRegistration = styled(Link)`
  display: block;
  margin-top: 10px;
  text-align: center;
`;

export const LoginForm = () => {
  const { CustomInput, CustomForm, CustomSubmit, CustomLabel } = UI;
  const token = useAppSelector(selectors.authSelectors.selectToken);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<InputsForm>();
  const { logIn } = useContext(AuthContext);

  const [setLogin, { error }] = useLogin();

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      const response = await setLogin(data);
      if (error) {
        if ('status' in error && error.status === 401 ) {
          throw new Error('InvalidLogin');
        } else {
          throw new Error('NetworkError')
        }
      }
      logIn(response.data);
      navigate(staticRoutes.home);
    } catch (e) {
      console.log(e);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <div>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <CustomLabel htmlFor="email">Email</CustomLabel>
        <CustomInput
          {...register('email', { required: true })}
          type="email"
          name="email"
          id="email"
          required
        />
        <CustomLabel htmlFor="password">Password</CustomLabel>
        <CustomInput
          {...register('password', {
            required: true,
            minLength: 8,
            maxLength: 26,
          })}
          type="password"
          name="password"
          id="password"
          required
        />
        <CustomSubmit type="submit">Log In</CustomSubmit>
      </CustomForm>
      <LinkRegistration to="/signup">Registration</LinkRegistration>
    </div>
  );
};
