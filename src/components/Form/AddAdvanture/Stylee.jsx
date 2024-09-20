import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  width: 100%;
  @media (min-width: 600px) {
    padding: 0px 20px;
  }
  @media (min-width: 900px) {
    padding: 0px 30px;
  }
`;

export const UploadContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 7%;

  @media (max-width: 600px) {
    justify-content: center;
    gap: 10px;
  }
`;

export const UploadBox = styled(Box)`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 280px;
    height: 80px;
  }
`;

export const ImagePreview = styled.img`
  width: 300px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

export const EditIcon = styled.img`
  position: absolute;
  top: 5%;
  right: 1%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
export const ErrorText = styled(Typography)`
  color: red;
  font-size: 10px;
`;
