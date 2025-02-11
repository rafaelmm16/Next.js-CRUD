import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;

  input {
    color: rgb(34, 34, 34);
    background: linear-gradient(142.99deg, rgb(70, 0, 55) 15.53%, rgb(0, 255, 170) 88.19%);
    box-shadow: 0px 12px 24px -1px rgba(0, 0, 0, 0.18);
    border: none;
    border-radius: 50px;
    padding: 15px;
    outline: none;
    text-align: center;
    width: 200px;
    font-size: 1rem; // Unidade relativa para melhor escalabilidade
    transition: all 0.4s ease-in-out;

    &::placeholder {
      color: rgba(0, 0, 0, 0.6);
      font-style: italic; // Diferenciar o placeholder
    }

    &:hover {
      width: 240px;
      box-shadow: 0px 16px 32px -1px rgba(0, 0, 0, 0.25);
    }

    &:focus {
      width: 280px;
      background: linear-gradient(142.99deg, rgba(159, 100, 255, 0.9) 15.53%, rgb(0, 78, 52) 88.19%);
      box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.2), 
                  0px 16px 32px -1px rgba(0, 128, 64, .5);
    }
    
    @media (max-width: 768px) { // Estilo responsivo
      width: 150px;

      &:hover {
        width: 180px;
      }

      &:focus {
        width: 200px;
      }
    }
    
    @media (max-width: 480px) { // Para dispositivos menores
      font-size: .9rem;
      padding: 12px;
      width: auto; // Ajusta automaticamente ao container
    }
    
    }
`;

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder }) => {
  return (
    <StyledWrapper>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder} // Melhora a acessibilidade
      />
    </StyledWrapper>
  );
};

export default Search;
