import styled from "styled-components";

const Card = styled.div<{ padding?: string; align?: string }>`
  background-color: white;
  padding: ${({ padding }) => padding || "45px 0"};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 540px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "center"};
  margin-bottom: 20px;
  box-sizing: border-box;
  position: relative;
`;

export default Card;
