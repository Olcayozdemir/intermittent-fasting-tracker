import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import styled from "styled-components";

const StyledAlert = styled.div<{
  type: "success" | "error";
  isVisible: boolean;
}>`
  padding: 1rem;
  margin: 1rem 0;
  color: white;
  background-color: ${({ type }) => (type === "success" ? "green" : "red")};
  border-radius: 0.5rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const Alert = ({
  type,
  message,
  isVisible = true,
}: {
  type: "success" | "error";
  message: string;
  isVisible?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isVisible);

    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledAlert type={type} isVisible={open}>
      {message}
    </StyledAlert>
  );
};

export default Alert;
