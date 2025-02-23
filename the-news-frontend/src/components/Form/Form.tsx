import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface FormProps {
  onSubmit: (formData: { email: string; password?: string }) => Promise<void>;
}

function Form(formProps: FormProps) {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');

  const formData = {
    email: emailInputValue,
    password: passwordInputValue,
  };

  return (
    <form
      className="flex flex-col justify-center items-start w-[80%] h-[80%]"
      onSubmit={() => formProps.onSubmit(formData)}
    >
      <Input
        label="E-mail"
        inputId="email"
        type="text"
        inputValue={emailInputValue}
        inputOnChange={(e) => setEmailInputValue(e.target.value)}
      />
      <Input
        label="Senha"
        inputId="password"
        type="password"
        inputValue={passwordInputValue}
        inputOnChange={(e) => setPasswordInputValue(e.target.value)}
        optional={true}
      />
      <Button />
    </form>
  );
}

export default Form;
