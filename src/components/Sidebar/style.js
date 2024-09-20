import styled from 'styled-components';
import { Box } from '@mui/material';

export const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
`;

export const LogoImg = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  margin: 0px 40px;
`;
export const MinLogoImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-top: 10px;
`;

export const ProfileBox = styled(Box)``;

export const ScrollableContent = styled(Box)`
  overflow: auto;
  height: calc(100vh - 160px); // Adjust based on your header/footer height
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
