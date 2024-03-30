import { useState } from "react";
import styled from "styled-components";

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 20px;
  font-size: 24px;
  font-weight: bold;
  top: 40%;
`;

const OptionsMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 60%;
  &.show {
    display: block;
  }
  border-radius: 8px;
`;

const Option = styled.div`
  padding: 12px 36px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
    border-radius: 8px;
  }
`;

const MoreOptionsMenu = ({ onDelete }: { onDelete: () => void }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <MoreButton onClick={toggleMenu}>⋮</MoreButton>
      <OptionsMenu className={showMenu ? "show" : ""}>
        <Option onClick={onDelete}>Delete </Option>
      </OptionsMenu>
    </div>
  );
};

export default MoreOptionsMenu;
