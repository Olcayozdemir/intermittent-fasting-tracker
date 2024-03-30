import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 111px;
`;

const LogoImage = styled.img`
  height: 40px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoImage src="logo.png" alt="My Logo" />
    </HeaderContainer>
  );
};

export default Header;
