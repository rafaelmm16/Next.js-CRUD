import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .input[type="text"] {
    display: block;
    color: rgb(34, 34, 34);
    background: linear-gradient(142.99deg, rgba(200, 255, 0, 0.952) 15.53%, rgb(192, 0, 96) 88.19%);
    box-shadow: 0px 12px 24px -1px rgba(0, 0, 0, 0.18);
    border-color: transparent; // Use transparent instead of rgba(7, 4, 14, 0)
    border-radius: 50px;
    height: 20px; // Use height instead of block-size for better cross-browser compatibility
    margin: 7px auto;
    padding: 18px 15px;
    outline: none;
    text-align: center;
    width: 200px;
    transition: 0.5s;
    &::placeholder {  // Target the placeholder specifically
      color: black;
  }

  .input[type="text"]:hover {
    width: 240px;
  }

  .input[type="text"]:focus {
    width: 280px;
  }
`;


const Search = ({ value, onChange, placeholder }) => { // Destructure props
  return (
    <StyledWrapper>
      <input
        type="text"
        name="text"
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};

export default Search;