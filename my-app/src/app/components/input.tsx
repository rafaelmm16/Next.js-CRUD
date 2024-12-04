import React from 'react';
import styled from 'styled-components';
interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange }) => {
  return (
    <StyledWrapper>
      <input
        type={type}
        autoComplete="off"
        name={name}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .input {
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #2f003d;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
    transition: 300ms ease-in-out;
    color: #ffffff; /* Adicione a cor do texto aqui */
  }

  .input:focus {
    background-color: #004b6e;
    transform: scale(1.05);
    box-shadow: 13px 13px 100px #969696,
               -13px -13px 100px #ffffff;
  }
`;

export default Input;