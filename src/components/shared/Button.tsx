import styled from "styled-components";

interface ButtonProps {
  loading?: boolean;
  isMobile?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: #002548;
  box-shadow: none;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0px 16px;
  border-radius: 100px;
  height: 60px;
  width: ${({ isMobile }) => (isMobile ? "90%" : "100%")};
  margin-top: 20px;
  max-width: 400px;
  &:hover {
    background-color: ${({ loading }) => (loading ? "#002548" : "#2c5282")};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Button;
