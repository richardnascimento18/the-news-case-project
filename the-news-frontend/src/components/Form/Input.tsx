interface InputProps {
  label: string;
  inputId: string;
  type: string;
  optional?: boolean;
  customClass?: string;
  inputValue?: string;
  inputOnChange?: (e: any) => void;
}

function Input(inputProps: InputProps) {
  return (
    <div className="flex flex-col w-[100%]">
      <label
        htmlFor={inputProps.inputId}
        className={
          'font-poppins text-white text-(length:--font-size-medium) font-normal ' +
          inputProps.customClass
        }
      >
        {inputProps.label}{' '}
        {inputProps.optional && (
          <span className="text-thenews-primary">(opcional)</span>
        )}
      </label>
      <input
        type={inputProps.type}
        className="p-2 my-2 bg-thenews-primary-250 rounded-(--rounding-radius) font-poppins text-white"
        id={inputProps.inputId}
        onChange={inputProps.inputOnChange}
        value={inputProps.inputValue}
      />
    </div>
  );
}

export default Input;
