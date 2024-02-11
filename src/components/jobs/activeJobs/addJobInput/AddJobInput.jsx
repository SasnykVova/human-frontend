import React from "react";
import s from "./AddJobInput.module.scss";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AddJobInput = (props) => {
  const disabled = props.disabled;

  const { label, name, register, errors, validation, pattern } = props;
  const { t } = useTranslation();

  return (
    <div className={s.addJobInput}>
      <label className={s.addJobInput__label}>{label}</label>
      <input
        className={s.addJobInput__textarea}
        placeholder={props.placeholder}
        type={props.type}
        disabled={disabled}
        style={{
          minWidth: window.innerWidth > 1200 ? props.widthInput : "100%",
          height: window.innerWidth > 1200 ? props.heightInput : "100%",
          letterSpacing: props.type === "password" ? "0.1rem" : "",
          border: errors[name] && "1px solid red",
          boxShadow: errors[name] && "0 0 0 1px red",
        }}
        {...register(name, { 
            required: `${t("validation.required")}`,
            pattern: {
                value: pattern,
                message: validation,
              } 
        })}
        // onChange={(e) => props.onChange(e.target.value)} value={props.value}
      ></input>
      <div className={s.errorsWrapper}>
        {errors[name] && <p className={s.errors}>{errors[name]?.message}</p>}
      </div>
    </div>
  );
};

export default AddJobInput;
