import { AppBar, Avatar, Box, IconButton, InputBase, Toolbar } from '@mui/material';
import styled from 'styled-components';

export const LogoImg = styled.img`
  height: 55px;
  margin: 30%;

  @media (max-width: 600px) {
    height: 40px;
    margin: 20%;
  }
`;

export const AppBarStyled = styled(AppBar)`
  z-index: 1201;
`;

export const MenuButton = styled(IconButton)`
  margin-right: 16px;
`;

export const ToolbarStyled = styled(Toolbar)`
  display: flex;
  align-items: center;
`;

export const Spacer = styled.div`
  flex-grow: 1;
  max-width: 10%;

  @media (max-width: 600px) {
    max-width: 20%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 15%;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-right: 16px;
  margin-left: 0;
  height: 40px;
`;

export const Search = styled.div`
  position: absolute;
  right: 0;
  border-radius: 10px;
  background-color: #f5f6f7;
  width: ${({ isSearchFocused }) => (isSearchFocused ? '300px' : '121px')};
  height: 40px;
  transition: width 0.3s ease-in-out;
`;

export const SearchIconWrapper = styled.div`
  padding: 0 6px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  padding: 5px 1px;
  padding-left: calc(0.2em + 32px);
  font-size: 1px;
`;

export const Notfication = styled(Box)`
  margin: auto 7px;
`;

export const Setting = styled(Box)`
  margin: auto 18px;
`;

export const ProfileBox = styled(Box)`
  margin: auto 2px;
  margin-left: 10px;
`;

export const ProfileAvatar = styled(Avatar)`
  height: 200px;
  width: 100px;

  @media (max-width: 600px) {
    height: 100px;
    width: 50px;
  }
`;

//Mobile Navbar
export const MiniSearch = styled.div`
  position: absolute;
  right: 0;
  border-radius: 10px;
  background-color: #f5f6f7;
  width: ${({ isSearchFocused }) => (isSearchFocused ? '100px' : '30px')};
  height: 40px;
  transition: width 0.3s ease-in-out;
`;
