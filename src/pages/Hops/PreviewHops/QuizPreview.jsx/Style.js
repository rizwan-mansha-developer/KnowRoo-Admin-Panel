import styled from 'styled-components';
import { Box, Button, Container, Typography } from '@mui/material';

export const StyledContainer = styled(Container)`
  width: 100%;
  // height: 100vh;
  display: flex !important;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  margin-bottom: 20px;
  max-width: 100vw;
  align-items: ${(props) => (props.isMobile ? 'center' : 'start')};
`;

export const StyledLeftMainBox = styled(Box)`
  display: flex !important;
  width: auto;
  // margin-top: 80px;
  flex-direction: column;
  // margin-bottom: ${(props) => (props.isMobile ? '16px' : '0')};
`;

export const StyledLeftUpperBox = styled(Box)`
  display: flex;
  justify-content: ${(props) => (props.isMobile ? 'flex-end' : 'space-between')};
  width: 100%;
  align-items: center;
  gap: 8px; /* 1 unit = 8px by default */
`;

export const StyledNumberBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(56, 187, 246, 0.08);
  font-weight: bold;
  width: ${(props) => (props.isMobile ? '50px' : '145px')};
  height: 30px;
  border-radius: 10px;
  color: #4bc1f7;
`;

export const StyledLeftLowerBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 8px; /* 1 unit = 8px by default */
  margin-top: 10px;
`;
export const StyledDeadlineBox = styled(Box)`
  background-color: rgba(255, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  width: 220px;
  height: 34px;
`;

export const StyledTimeBox = styled(Box)`
  color: #ff0000;
  // font-weight: bold;
  background-color: white;
  border-radius: 7px;
  height: 25px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTimerBox = styled(Box)`
  display: flex;
  width: auto;
  height: auto;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const StyledCenterBox = styled(Box)`
  width: ${(props) => (props.isMobile ? '100%' : '48%')};
  height: auto;
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

export const StyledTypography = styled(Typography)`
  width: 90%;
  // margin-top: 80px !important;
  // text-align: center;
  color: #8c9faa;
  // margin-bottom: ${(props) => (props.isMobile ? '64px !important' : '160px !important')};
`;

export const StyledButton = styled(Button)`
  height: 40px;
  width: 170px;
  font-weight: bold !important;
  border-radius: 15px !important;
  box-shadow: 0px 4px #1899d6;
  color: white !important;
  background-color: #03a9f4 !important;
`;

export const StyledDesktopTimerBox = styled(Box)`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  // margin-top: 16px; /* 4 units = 16px by default */
`;

export const StyledBox = styled(Box)`
  // width: 390px;
  // height: auto;
  // padding: 30px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #ffffff;
  // border-radius: 40px;
`;

export const StyledInnerBox = styled(Box)`
  width: 90%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 8px;
  background-color: #f9f9f9;
  border-radius: 12px;

  .item-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    gap: 8px;
  }
`;

export const StyledItemBox = styled(Box)`
  width: ${({ width }) => (width === '1/2' ? '50%' : '100%')};
  @media (max-width: 380px) {
    width: 100%;
  }
`;
