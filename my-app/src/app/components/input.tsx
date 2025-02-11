import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange }) => {
  return (
    <StyledWrapper>
      <form className="formField">
        <input required type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
        <span>{placeholder}</span>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .formField {
    margin: 10px;
    position: relative;
  }

  .formField input {
    padding: 20px 15px 10px 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: #333;
    font-size: 16px;
    font-weight: 550;
    transition: 0.3s ease-in-out;
    box-shadow: 0 0 0 5px transparent;
  }

  .formField input:hover,
  .formField input:focus {
    box-shadow: 0 0 0 2px #333;
  }

  .formField span {
    position: absolute;
    left: 0;
    top: 0;
    padding: 13px 15px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    text-shadow: -1px -1px 0 #f1f1f1, 1px -1px 0 #f1f1f1, -1px 1px 0 #f1f1f1,
      1px 1px 0 #f1f1f1;
    transition: 0.3s ease-in-out;
    pointer-events: none;
  }

  .formField input:focus + span,
  .formField input:valid + span {
    transform: translateY(-12px) translateX(-5px) scale(0.95);
    transition: 0.3s ease-in-out;
  }`;

export default Input;
