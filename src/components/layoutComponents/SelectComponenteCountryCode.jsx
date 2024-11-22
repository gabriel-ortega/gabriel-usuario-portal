import React from "react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/material.css";

export function SelectComponenteCountryCode({
  onChange,
  text,
  classNamePhone,
  value,
  data,
  initialCountry = "pa",
  handlePhoneChange,
  name,
  helperText = false,
  label = "",
  isValid = true,
}) {
  const handleOnChange = (value, data, event, e) => {
    const dialCode = data.dialCode;
    const number = value.slice(data.dialCode.length);
    onChange({ data, value });
  };

  let inputStyle = {};

  if (helperText) {
    inputStyle = {
      height: "6vh",
      width: "100%",
      fontSize: "12.5px",
      border: "1px solid red",
    };
  } else {
    inputStyle = {
      height: "6vh",
      fontSize: "12.5px",
      width: "100%",
    };
  }

  return (
    <section className={isValid ? "" : "text-red-600"}>
      <PhoneInput
        placeholder={text}
        masks={{ pa: "....-...." }}
        specialLabel={label}
        containerClass="phone-input"
        country={initialCountry}
        value={data}
        onChange={handleOnChange}
        enableSearch={true}
        fullWidth
        countryCodeEditable={false}
        inputProps={{
          name: { name },
          required: true,
        }}
        autoFormat={false}
        className={`${classNamePhone} ${
          !isValid ? "border rounded-md border-red-600 " : ""
        }`}
        inputStyle={inputStyle}
      />
      <section className="ml-5">
        <span className={`text-xs text-red-600`}>
          {helperText ? "This field is mandatory." : ""}
        </span>
      </section>
    </section>
  );
}
