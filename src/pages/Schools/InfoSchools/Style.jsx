import styled from 'styled-components';
import { Typography, Box, Grid } from '@mui/material';

export const Container = styled(Box)`
  padding: 16px;

  border-radius: 8px;
`;

export const ThumbnailContainer = styled(Box)`
  position: relative;
  text-align: center;
  height: 200px;
  border: 1px solid #818080;
  border-radius: 8px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 8px;
`;

export const Logo = styled.img`
  position: absolute;
  bottom: 17%;
  left: 50%;
  transform: translateX(-50%);
`;

export const GrayContainer = styled(Grid)`
  background-color: #fafafb;
  border-radius: 8px;
  padding: 8px;
  width: auto;
`;

export const Label = styled(Typography)`
  font-weight: bold;
  margin-bottom: 4px;
  color: #616161;
`;

export const Value = styled(Typography)`
  color: #424242;
`;
