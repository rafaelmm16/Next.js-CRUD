import React from 'react';
import styled from 'styled-components';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <StyledWrapper>
    <button className="Btn" onClick={onClick}>
      Edit
      <svg className="svg" viewBox="0 0 512 512">
      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L205.2 179l-33.9 33.9-78.5 78.5 22.6 22.6 11.3 11.3 33.9 33.9L231 410.3l54.7-54.7 22.6-22.6 11.3-11.3 62.1-62.1 33.9-33.9 11.3-11.3zM256 352c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"/>
      </svg>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
     .Btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100px;
    height: 40px;
    border: none;
    padding: 0px 20px;
    background-color: rgb(168, 38, 255);
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 5px 5px 0px rgb(140, 32, 212);
    transition-duration: .3s;
  }

  .svg {
    width: 13px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: white;
    transition-duration: .3s;
  }

  .Btn:hover {
    color: transparent;
  }

  .Btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: .3s;
  }

  .Btn:active {
    transform: translate(3px , 3px);
    transition-duration: .3s;
    box-shadow: 2px 2px 0px rgb(140, 32, 212);
  }`

export default EditButton;