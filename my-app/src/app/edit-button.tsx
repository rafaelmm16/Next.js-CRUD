import React from 'react';
import styled from 'styled-components';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <StyledWrapper>
    <button className="Btn" onClick={onClick}> {/* Add onClick here */}
      Edit
      <svg className="svg" viewBox="0 0 512 512">
        {/* ... (SVG path) */}
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