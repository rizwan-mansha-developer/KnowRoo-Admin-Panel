import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import styled from 'styled-components';

export const StyledDeadlineBox = styled(Box)`
  background-color: rgba(255, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  width: 200px;
  height: 34px;
`;
export const StyledTimeBox = styled(Box)`
  color: #ff0000;
  //   font-weight: bold;
  background-color: white;
  border-radius: 7px;
  height: 25px;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledContainer = styled(Container)`
  width: 100%;
  display: flex !important;
  justify-content: center;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledInnerBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;

  .item-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fafafb;
    gap: 8px;
    border-radius: 8px;
    padding: 8px 0;

    @media (max-width: 380px) {
      flex-direction: column;
    }
  }

  .item {
    width: 47%;
    height: 30px;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 380px) {
      width: 94%;
    }
  }

  .full-item {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafb;
    border-radius: 8px;
    gap: 2px;
  }
`;

export const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

export const StyledItemBox = styled(Box)`
  width: ${(props) => (props.width ? props.width : '100%')};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
