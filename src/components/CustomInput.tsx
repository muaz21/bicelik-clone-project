import {useId} from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from "./ui";

const CustomInput = ({
  control = null,
  className = null,
  label = null,
  placeholder = null,
  inputOnly = null,
  type = "text",
  errorText = "",
  name = null,
  isRequired = false,
  value = null,
  onChange = null,
  error = null,
  readOnly = null,
  disabled = null,
}: any) => {
  const id = useId();

  return (
    <>
      {inputOnly ? (
        <div className="flex flex-col w-full gap-1.5">
          {label && (
            <Label htmlFor={id}>
              {label}
              {isRequired && <span className="text-rose-500"> *</span>}
            </Label>
          )}
          <Input
            className={`${className}`}
            type={type}
            id={id}
            value={value}
            name={name}
            min={1}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={placeholder}
          />
          {error && error?.show && (
            <div className="shad-form_message">{error?.text}</div>
          )}
        </div>
      ) : (
        <FormField
          control={control}
          name={name}
          render={({field}) => (
            <FormItem className="w-full">
              {label && (
                <FormLabel className="shad-form_label">{label}</FormLabel>
              )}
              <FormControl>
                <Input
                  className={`shad-input ${className}`}
                  placeholder={placeholder}
                  type={type}
                  readOnly={readOnly}
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message">
                {errorText ? errorText : ""}
              </FormMessage>
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CustomInput;
